import type { CourseCategoryKey, RewardTypeKey } from '#/api/types'

export const REWARD_FORM_CATEGORY_OPTIONS = [
  'web',
  'game dev',
  'embedded',
  'primary',
  'python',
] as const satisfies readonly CourseCategoryKey[]

export const REWARD_FILTER_CATEGORY_OPTIONS = [
  ...REWARD_FORM_CATEGORY_OPTIONS,
  'no category',
] as const satisfies readonly CourseCategoryKey[]

export const REWARD_TYPE_OPTIONS = [
  'reward',
  'privilege',
] as const satisfies readonly RewardTypeKey[]
