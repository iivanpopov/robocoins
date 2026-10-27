import * as v from 'valibot'

import type { CreateRewardRequest, RewardResponse } from '#/api/types'

import {
  RewardCourseCategoryFieldSchema,
  RewardNameSchema,
  RewardPriceSchema,
  RewardTypeSchema,
} from '../-schemas'
import type { RewardDraft, RewardDraftErrors } from '../-types'

export function createEmptyRewardDraft(): RewardDraft {
  return {
    name: '',
    price: '',
    description: '',
    type: 'reward',
    courseCategory: null,
  }
}

export function getRewardDraftFromReward(reward: RewardResponse): RewardDraft {
  return {
    name: reward.name,
    price: String(reward.price),
    description: reward.description ?? '',
    type: reward.type,
    courseCategory: reward.course_category === 'no category' ? null : reward.course_category,
  }
}

export function getRewardDraftErrors(draft: RewardDraft): RewardDraftErrors {
  const errors: RewardDraftErrors = {}

  const nameResult = v.safeParse(RewardNameSchema, draft.name)
  if (!nameResult.success) errors.name = 'admin.catalog.validation.name'

  const priceResult = v.safeParse(RewardPriceSchema, draft.price)
  if (!priceResult.success) errors.price = 'admin.catalog.validation.price'

  const typeResult = v.safeParse(RewardTypeSchema, draft.type)
  if (!typeResult.success) errors.type = 'admin.catalog.validation.type'

  const categoryResult = v.safeParse(RewardCourseCategoryFieldSchema, draft.courseCategory)
  if (!categoryResult.success) errors.courseCategory = 'admin.catalog.validation.category'

  return errors
}

export function haveRewardDraftsChanged(first: RewardDraft, second: RewardDraft) {
  return (
    first.name.trim() !== second.name.trim() ||
    first.price.trim() !== second.price.trim() ||
    first.description.trim() !== second.description.trim() ||
    first.type !== second.type ||
    first.courseCategory !== second.courseCategory
  )
}

export function toCreateRewardRequest(draft: RewardDraft): CreateRewardRequest {
  const description = draft.description.trim()

  return {
    name: draft.name.trim(),
    price: Number(draft.price.trim()),
    description: description || null,
    type: draft.type,
    course_category: draft.courseCategory,
  }
}
