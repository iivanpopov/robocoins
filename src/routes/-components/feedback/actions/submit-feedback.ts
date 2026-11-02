import { createHash } from 'node:crypto'

import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { sql } from 'drizzle-orm'

import { db } from '#/db'
import { feedback, feedbackRateLimit } from '#/db/schema'
import { getSession } from '#/routes/-actions/get-session'

import { FEEDBACK_RATE_LIMIT_MAX, FEEDBACK_RATE_LIMIT_WINDOW_MS } from '../constants'
import { FeedbackSubmissionSchema } from '../schemas'
import type { FeedbackSubmissionResult } from '../types'

export const submitFeedback = createServerFn({ method: 'POST' })
  .validator(FeedbackSubmissionSchema)
  .handler(async (context): Promise<FeedbackSubmissionResult> => {
    const input = context.data

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
      const headers = getRequest().headers
      const address =
        headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        headers.get('x-real-ip') ||
        'unknown'
      const actor =
        studentId === null
          ? `ip:${createHash('sha256').update(address).digest('hex')}`
          : `student:${studentId}`
      const now = new Date()
      const windowStartedAt = new Date(now.getTime() - FEEDBACK_RATE_LIMIT_WINDOW_MS)
      const rateLimit = await db
        .insert(feedbackRateLimit)
        .values({ bucket: `${input.source}:${actor}`, windowStartedAt: now, count: 1 })
        .onConflictDoUpdate({
          target: feedbackRateLimit.bucket,
          set: {
            count: sql`case when ${feedbackRateLimit.windowStartedAt} <= ${windowStartedAt.toISOString()}::timestamptz then 1 else ${feedbackRateLimit.count} + 1 end`,
            windowStartedAt: sql`case when ${feedbackRateLimit.windowStartedAt} <= ${windowStartedAt.toISOString()}::timestamptz then ${now.toISOString()}::timestamptz else ${feedbackRateLimit.windowStartedAt} end`,
          },
        })
        .returning({ count: feedbackRateLimit.count })

      if (!rateLimit[0] || rateLimit[0].count > FEEDBACK_RATE_LIMIT_MAX) {
        return { ok: false, error: 'rate-limit' }
      }

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

      return { ok: false, error: 'conflict' }
    } catch {
      return { ok: false, error: 'unavailable' }
    }
  })
