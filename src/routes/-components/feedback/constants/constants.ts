import type { FeedbackKind, FeedbackSource } from './enum'

export const FEEDBACK_MESSAGE_MIN_LENGTH = 3
export const FEEDBACK_MESSAGE_MAX_LENGTH = 2000

export const FEEDBACK_TRIGGER_KEYS = {
  student_home: 'feedback.trigger.home',
  registration_avatar: 'feedback.trigger.registration-avatar',
  profile_avatar: 'feedback.trigger.profile-avatar',
  shop: 'feedback.trigger.shop',
} as const satisfies Record<FeedbackSource, string>

export const FEEDBACK_TITLE_KEYS = {
  student_home: 'feedback.title.home',
  registration_avatar: 'feedback.title.avatar',
  profile_avatar: 'feedback.title.avatar',
  shop: 'feedback.title.reward',
} as const satisfies Record<FeedbackSource, string>

export const FEEDBACK_DESCRIPTION_KEYS = {
  student_home: 'feedback.description.home',
  registration_avatar: 'feedback.description.registration-avatar',
  profile_avatar: 'feedback.description.profile-avatar',
  shop: 'feedback.description.shop',
} as const satisfies Record<FeedbackSource, string>

export const FEEDBACK_KIND_KEYS = {
  idea: 'feedback.kind.idea',
  problem: 'feedback.kind.problem',
  other: 'feedback.kind.other',
  avatar_suggestion: 'feedback.kind.avatar-suggestion',
  reward_suggestion: 'feedback.kind.reward-suggestion',
} as const satisfies Record<FeedbackKind, string>
