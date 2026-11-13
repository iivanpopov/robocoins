import * as v from 'valibot'

export const AchievementNameSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1, 'admin.achievements.validation.name'),
  v.maxLength(200, 'admin.achievements.validation.name'),
)

export const AchievementDescriptionSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1, 'admin.achievements.validation.description'),
  v.maxLength(1000, 'admin.achievements.validation.description'),
)

export const AchievementRequiredCoinsSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1, 'admin.achievements.validation.required'),
  v.regex(/^\d+$/, 'admin.achievements.validation.required'),
  v.check((value) => Number.isSafeInteger(Number(value)), 'admin.achievements.validation.required'),
)

export const AchievementIdParamsSchema = v.object({
  achievementId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})
