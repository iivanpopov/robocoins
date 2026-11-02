import { createHash } from 'node:crypto'

import { getRequest } from '@tanstack/react-start/server'
import { eq, sql } from 'drizzle-orm'

import { db } from '#/db'
import { feedback, feedbackRateLimit } from '#/db/schema'
import { getSession } from '#/lib/session'

import { FEEDBACK_RATE_LIMIT_MAX, FEEDBACK_RATE_LIMIT_WINDOW_MS } from '../-constants'
import type { FeedbackSubmissionInput, FeedbackSubmissionResult } from '../-types'

interface StoredFeedback {
  kind: string
  source: string
  message: string
  studentId: number | null
}

function getClientAddress() {
  const headers = getRequest().headers
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return headers.get('x-real-ip') || 'unknown'
}

function getRateLimitBucket(source: string, studentId: number | null) {
  const actor =
    studentId === null
      ? `ip:${createHash('sha256').update(getClientAddress()).digest('hex')}`
      : `student:${studentId}`

  return `${source}:${actor}`
}

async function consumeRateLimit(source: string, studentId: number | null) {
  const now = new Date()
  const windowStartedAt = new Date(now.getTime() - FEEDBACK_RATE_LIMIT_WINDOW_MS)

  const rows = await db
    .insert(feedbackRateLimit)
    .values({ bucket: getRateLimitBucket(source, studentId), windowStartedAt: now, count: 1 })
    .onConflictDoUpdate({
      target: feedbackRateLimit.bucket,
      set: {
        count: sql`case when ${feedbackRateLimit.windowStartedAt} <= ${windowStartedAt.toISOString()}::timestamptz then 1 else ${feedbackRateLimit.count} + 1 end`,
        windowStartedAt: sql`case when ${feedbackRateLimit.windowStartedAt} <= ${windowStartedAt.toISOString()}::timestamptz then ${now.toISOString()}::timestamptz else ${feedbackRateLimit.windowStartedAt} end`,
      },
    })
    .returning({ count: feedbackRateLimit.count })

  return (rows[0]?.count ?? FEEDBACK_RATE_LIMIT_MAX + 1) <= FEEDBACK_RATE_LIMIT_MAX
}

function isSameFeedback(
  stored: StoredFeedback,
  input: FeedbackSubmissionInput,
  message: string,
  studentId: number | null,
) {
  return (
    stored.kind === input.kind &&
    stored.source === input.source &&
    stored.message === message &&
    stored.studentId === studentId
  )
}

function getIdempotentResult(
  stored: StoredFeedback,
  input: FeedbackSubmissionInput,
  message: string,
  studentId: number | null,
): FeedbackSubmissionResult {
  if (!isSameFeedback(stored, input, message, studentId)) {
    return { ok: false, error: 'conflict' }
  }

  return { ok: true, id: input.id, duplicate: true }
}

async function findFeedback(id: string) {
  const rows = await db
    .select({
      kind: feedback.kind,
      source: feedback.source,
      message: feedback.message,
      studentId: feedback.studentId,
    })
    .from(feedback)
    .where(eq(feedback.id, id))
    .limit(1)

  return rows[0]
}

export async function saveFeedback(
  input: FeedbackSubmissionInput,
): Promise<FeedbackSubmissionResult> {
  let session
  try {
    session = await getSession()
  } catch {
    return { ok: false, error: 'unavailable' }
  }

  const student = session?.role === 'student' ? session : null
  if (!student && input.source !== 'registration_avatar') {
    return { ok: false, error: session ? 'author' : 'session' }
  }

  const studentId = student?.id ?? null
  const studentName = student?.name ?? null
  const message = input.message.trim()

  try {
    const existing = await findFeedback(input.id)
    if (existing) return getIdempotentResult(existing, input, message, studentId)

    const isAllowed = await consumeRateLimit(input.source, studentId)
    if (!isAllowed) return { ok: false, error: 'rate-limit' }

    const inserted = await db
      .insert(feedback)
      .values({
        id: input.id,
        kind: input.kind,
        source: input.source,
        message,
        studentId,
        studentName,
      })
      .onConflictDoNothing({ target: feedback.id })
      .returning({ id: feedback.id })

    if (inserted[0]) return { ok: true, id: inserted[0].id, duplicate: false }

    const raced = await findFeedback(input.id)
    if (raced) return getIdempotentResult(raced, input, message, studentId)

    return { ok: false, error: 'unavailable' }
  } catch {
    return { ok: false, error: 'unavailable' }
  }
}
