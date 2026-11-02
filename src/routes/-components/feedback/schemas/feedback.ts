import * as v from 'valibot'

import {
  FEEDBACK_KINDS,
  FEEDBACK_MESSAGE_MAX_LENGTH,
  FEEDBACK_MESSAGE_MIN_LENGTH,
  FEEDBACK_SOURCES,
} from '../constants'

export const FeedbackMessageSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(FEEDBACK_MESSAGE_MIN_LENGTH, 'feedback.validation.message.min'),
  v.maxLength(FEEDBACK_MESSAGE_MAX_LENGTH, 'feedback.validation.message.max'),
)

export const FeedbackFormSchema = v.object({
  kind: v.picklist(FEEDBACK_KINDS),
  message: FeedbackMessageSchema,
})

export const FeedbackSubmissionSchema = v.object({
  id: v.pipe(v.string(), v.uuid('feedback.validation.id')),
  source: v.picklist(FEEDBACK_SOURCES),
  kind: v.picklist(FEEDBACK_KINDS),
  message: FeedbackMessageSchema,
})
