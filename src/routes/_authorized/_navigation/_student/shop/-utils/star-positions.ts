import type { RewardResponse } from '#/api/types/RewardResponse'

export function getStarPositions(rewards: RewardResponse[], seed: number) {
  const stars: { reward: RewardResponse; x: number; y: number }[] = []
  const minimumDistance = Math.min(30, 60 / Math.sqrt(rewards.length || 1))
  let randomState = seed >>> 0

  function random() {
    randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0
    return randomState / 4294967296
  }

  for (const reward of [...rewards].sort((first, second) => first.id - second.id)) {
    let position: { x: number; y: number }
    do {
      position = { x: random() * 100, y: random() * 100 }
    } while (
      stars.some((star) => {
        const deltaX = Math.abs(star.x - position.x)
        const deltaY = Math.abs(star.y - position.y)
        const distance = Math.hypot(
          Math.min(deltaX, 100 - deltaX),
          Math.min(deltaY, 100 - deltaY) * 2,
        )
        return distance < minimumDistance
      })
    )
    stars.push({ reward, ...position })
  }

  return stars
}
