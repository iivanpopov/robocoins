import {
  ACHIEVEMENT_ARTWORK_TIERS,
  ACHIEVEMENT_ARTWORK_URLS,
  type AchievementArtworkId,
  type AchievementArtworkTier,
} from '../constants'

export function getAchievementArtworkTier(requiredCoins: number | null): AchievementArtworkTier {
  let tier: AchievementArtworkTier = ACHIEVEMENT_ARTWORK_TIERS[0]

  if (requiredCoins === null) return tier

  for (const candidate of ACHIEVEMENT_ARTWORK_TIERS) {
    if (candidate.minimumCoins === null) continue
    if (requiredCoins >= candidate.minimumCoins) tier = candidate
  }

  return tier
}

export function getAchievementArtworkIcon(requiredCoins: number | null): AchievementArtworkId {
  return getAchievementArtworkTier(requiredCoins).icon
}

export function getAchievementArtworkUrl(requiredCoins: number | null) {
  return ACHIEVEMENT_ARTWORK_URLS[getAchievementArtworkIcon(requiredCoins)]
}
