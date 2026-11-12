export interface AchievementDraft {
  name: string
  description: string
  requiredCoins: string
}

export type AchievementDraftField = 'name' | 'description' | 'requiredCoins'

export type AchievementDraftErrorKey =
  | 'admin.achievements.validation.name'
  | 'admin.achievements.validation.description'
  | 'admin.achievements.validation.required'

export type AchievementDraftErrors = Partial<
  Record<AchievementDraftField, AchievementDraftErrorKey>
>

export type AchievementErrorKey =
  | 'admin.achievements.error.load'
  | 'admin.achievements.error.request'
  | 'admin.achievements.error.forbidden'
  | 'admin.achievements.error.not-found'
  | 'admin.achievements.error.validation'
  | 'admin.achievements.create.error'
  | 'admin.achievements.delete.error'
  | 'error.session'
