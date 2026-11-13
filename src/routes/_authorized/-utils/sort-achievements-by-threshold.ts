import type { CoinAchievementProgressItem } from '#/api/types'

export function sortAchievementsByThreshold<
  Achievement extends { id: number; required_coins: number | null },
>(achievements: readonly Achievement[]) {
  return achievements.toSorted((first, second) => {
    if (first.required_coins === null && second.required_coins === null) {
      return first.id - second.id
    }
    if (first.required_coins === null) return 1
    if (second.required_coins === null) return -1

    return first.required_coins - second.required_coins || first.id - second.id
  })
}

export function findNearestUnearnedAchievement(
  achievements: readonly CoinAchievementProgressItem[],
) {
  return sortAchievementsByThreshold(achievements.filter((achievement) => !achievement.earned))[0]
}

export function sortAchievementsForShowcase<
  Achievement extends { id: number; required_coins: number | null; earned: boolean },
>(achievements: readonly Achievement[]) {
  return achievements.toSorted((first, second) => {
    if (first.earned !== second.earned) return Number(second.earned) - Number(first.earned)
    if (first.required_coins === null && second.required_coins === null) return first.id - second.id
    if (first.required_coins === null) return 1
    if (second.required_coins === null) return -1
    const thresholdDifference = first.required_coins - second.required_coins
    if (first.earned) return -thresholdDifference || first.id - second.id
    return thresholdDifference || first.id - second.id
  })
}
