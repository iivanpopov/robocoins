import * as v from 'valibot'

import { courseCategory, rewardType } from '#/api/types'

export const RewardTypeSchema = v.picklist(
  Object.values(rewardType),
  'admin.catalog.validation.type',
)
export const RewardCourseCategoryFieldSchema = v.nullable(
  v.picklist(Object.values(courseCategory), 'admin.catalog.validation.category'),
)

export const RewardNameSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1, 'admin.catalog.validation.name'),
)

export const RewardPriceSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1, 'admin.catalog.validation.price'),
  v.regex(/^\d+$/, 'admin.catalog.validation.price'),
  v.check((value) => Number.isSafeInteger(Number(value)), 'admin.catalog.validation.price'),
)

export const RewardDraftSchema = v.object({
  name: RewardNameSchema,
  price: RewardPriceSchema,
  description: v.string(),
  type: RewardTypeSchema,
  courseCategory: RewardCourseCategoryFieldSchema,
})

export const RewardImageLinkSchema = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1, 'admin.catalog.image.error.link'),
  v.url('admin.catalog.image.error.link'),
  v.check((value) => /^https?:\/\//i.test(value), 'admin.catalog.image.error.link'),
)

export const RewardParamsSchema = v.object({
  rewardId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})
