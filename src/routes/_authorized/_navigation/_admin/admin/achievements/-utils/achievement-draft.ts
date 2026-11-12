import * as v from 'valibot'

import { achievementType, type AchievementCreateRequest } from '#/api/types'
import { getAchievementArtworkIcon } from '#/routes/_authorized/-components/achievements'

import {
  AchievementDescriptionSchema,
  AchievementNameSchema,
  AchievementRequiredCoinsSchema,
} from '../-schemas'
import type { AchievementDraft, AchievementDraftErrors } from '../-types'

export function createEmptyAchievementDraft(): AchievementDraft {
  return { name: '', description: '', requiredCoins: '' }
}

export function getAchievementDraftErrors(draft: AchievementDraft): AchievementDraftErrors {
  const errors: AchievementDraftErrors = {}

  const nameResult = v.safeParse(AchievementNameSchema, draft.name)
  if (!nameResult.success) errors.name = 'admin.achievements.validation.name'

  const descriptionResult = v.safeParse(AchievementDescriptionSchema, draft.description)
  if (!descriptionResult.success) errors.description = 'admin.achievements.validation.description'

  const requiredCoinsResult = v.safeParse(AchievementRequiredCoinsSchema, draft.requiredCoins)
  if (!requiredCoinsResult.success) errors.requiredCoins = 'admin.achievements.validation.required'

  return errors
}

export function getAchievementDraftCoins(draft: AchievementDraft) {
  const result = v.safeParse(AchievementRequiredCoinsSchema, draft.requiredCoins)
  if (!result.success) return null

  return Number(result.output)
}

export function toCreateAchievementRequest(draft: AchievementDraft): AchievementCreateRequest {
  const requiredCoins = Number(draft.requiredCoins.trim())

  return {
    name: draft.name.trim(),
    description: draft.description.trim(),
    icon: getAchievementArtworkIcon(requiredCoins),
    type: achievementType.badge,
    required_coins: requiredCoins,
  }
}
