export const FEEDBACK_KINDS = [
  'idea',
  'problem',
  'other',
  'avatar_suggestion',
  'reward_suggestion',
] as const

export type FeedbackKind = (typeof FEEDBACK_KINDS)[number]

export const FEEDBACK_SOURCES = [
  'student_home',
  'registration_avatar',
  'profile_avatar',
  'shop',
] as const

export type FeedbackSource = (typeof FEEDBACK_SOURCES)[number]

export const FEEDBACK_SOURCE_KINDS: Record<FeedbackSource, ReadonlyArray<FeedbackKind>> = {
  student_home: ['idea', 'problem', 'other'],
  registration_avatar: ['avatar_suggestion'],
  profile_avatar: ['avatar_suggestion'],
  shop: ['reward_suggestion'],
}

export const FEEDBACK_DEFAULT_KIND: Record<FeedbackSource, FeedbackKind> = {
  student_home: 'idea',
  registration_avatar: 'avatar_suggestion',
  profile_avatar: 'avatar_suggestion',
  shop: 'reward_suggestion',
}

export const FEEDBACK_ERROR_CODES = [
  'session',
  'author',
  'rate-limit',
  'conflict',
  'validation',
  'unavailable',
] as const

export type FeedbackErrorCode = (typeof FEEDBACK_ERROR_CODES)[number]
