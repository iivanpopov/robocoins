import { sql } from 'drizzle-orm'
import { check, index, integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { FEEDBACK_KINDS, FEEDBACK_SOURCES } from '../feedback/-constants'

export const feedbackKind = pgEnum('feedback_kind', FEEDBACK_KINDS)
export const feedbackSource = pgEnum('feedback_source', FEEDBACK_SOURCES)

export const feedback = pgTable(
  'feedback',
  {
    id: uuid('id').primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    kind: feedbackKind('kind').notNull(),
    source: feedbackSource('source').notNull(),
    message: text('message').notNull(),
    studentId: integer('student_id'),
    studentName: text('student_name'),
  },
  (table) => [
    index('feedback_created_at_idx').on(table.createdAt),
    check('feedback_message_length_check', sql`char_length(${table.message}) between 3 and 2000`),
    check('feedback_message_trimmed_check', sql`${table.message} = btrim(${table.message})`),
    check(
      'feedback_author_check',
      sql`(${table.studentId} is null and ${table.studentName} is null) or (${table.studentId} is not null and ${table.studentName} is not null)`,
    ),
    check(
      'feedback_source_author_check',
      sql`${table.source} = 'registration_avatar' or ${table.studentId} is not null`,
    ),
    check(
      'feedback_source_kind_check',
      sql`(${table.source} = 'student_home' and ${table.kind} in ('idea', 'problem', 'other')) or (${table.source} in ('registration_avatar', 'profile_avatar') and ${table.kind} = 'avatar_suggestion') or (${table.source} = 'shop' and ${table.kind} = 'reward_suggestion')`,
    ),
  ],
)

export const feedbackRateLimit = pgTable(
  'feedback_rate_limit',
  {
    bucket: text('bucket').primaryKey(),
    windowStartedAt: timestamp('window_started_at', { withTimezone: true }).notNull(),
    count: integer('count').notNull(),
  },
  (table) => [check('feedback_rate_limit_count_check', sql`${table.count} > 0`)],
)
