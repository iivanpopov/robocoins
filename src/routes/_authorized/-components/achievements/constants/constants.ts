import coinLaurel1 from '#/assets/images/achievements/coin-laurel-1.svg?url'
import coinLaurel2 from '#/assets/images/achievements/coin-laurel-2.svg?url'
import coinLaurel3 from '#/assets/images/achievements/coin-laurel-3.svg?url'
import coinLaurel4 from '#/assets/images/achievements/coin-laurel-4.svg?url'
import coinLaurel5 from '#/assets/images/achievements/coin-laurel-5.svg?url'
import coinLaurel6 from '#/assets/images/achievements/coin-laurel-6.svg?url'

export const ACHIEVEMENT_ARTWORK_URLS = {
  'coin-laurel-1': coinLaurel1,
  'coin-laurel-2': coinLaurel2,
  'coin-laurel-3': coinLaurel3,
  'coin-laurel-4': coinLaurel4,
  'coin-laurel-5': coinLaurel5,
  'coin-laurel-6': coinLaurel6,
} as const

export type AchievementArtworkId = keyof typeof ACHIEVEMENT_ARTWORK_URLS

export const ACHIEVEMENT_ARTWORK_TIERS = [
  { icon: 'coin-laurel-1', minimumCoins: null, labelKey: 'achievement.artwork.tier.1' },
  { icon: 'coin-laurel-2', minimumCoins: 5, labelKey: 'achievement.artwork.tier.2' },
  { icon: 'coin-laurel-3', minimumCoins: 15, labelKey: 'achievement.artwork.tier.3' },
  { icon: 'coin-laurel-4', minimumCoins: 30, labelKey: 'achievement.artwork.tier.4' },
  { icon: 'coin-laurel-5', minimumCoins: 60, labelKey: 'achievement.artwork.tier.5' },
  { icon: 'coin-laurel-6', minimumCoins: 100, labelKey: 'achievement.artwork.tier.6' },
] as const

export type AchievementArtworkTier = (typeof ACHIEVEMENT_ARTWORK_TIERS)[number]
