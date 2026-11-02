import type { FeedbackErrorCode, FeedbackKind, FeedbackSource } from '../constants'

export type { FeedbackErrorCode }

export interface FeedbackSubmissionInput {
  id: string
  source: FeedbackSource
  kind: FeedbackKind
  message: string
}

export type FeedbackSubmissionResult =
  | { ok: true; id: string; duplicate: boolean }
  | { ok: false; error: FeedbackErrorCode }

export interface FeedbackFormValues {
  kind: FeedbackKind
  message: string
}
