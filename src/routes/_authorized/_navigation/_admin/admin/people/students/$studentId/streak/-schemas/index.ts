import * as v from 'valibot'

export const StudentIdParamsSchema = v.object({
  studentId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})

export const StreakDaysSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1),
  v.regex(/^\d+$/),
  v.transform(Number),
  v.safeInteger(),
  v.minValue(0),
)

export const StreakDaysFormSchema = v.object({
  days: StreakDaysSchema,
})
