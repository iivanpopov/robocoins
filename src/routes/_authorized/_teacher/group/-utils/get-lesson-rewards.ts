import type { BalanceTransactionResponse } from '#/api/types'

export function getLessonRewards(
  transactions: BalanceTransactionResponse[],
  reasons: string[],
  windowStart: number,
  now: number,
) {
  const rewards = new Map<string, { reason: string; count: number; latest: number }>()

  for (const transaction of transactions) {
    const createdAt = new Date(transaction.created_at).getTime()
    if (
      transaction.operation !== 'deposit' ||
      transaction.cancelled_at ||
      !Number.isFinite(createdAt) ||
      createdAt < windowStart ||
      createdAt > now
    )
      continue

    for (const reason of new Set(transaction.reason ?? [])) {
      if (!reasons.includes(reason)) continue

      const reward = rewards.get(reason) ?? { reason, count: 0, latest: createdAt }
      reward.count += 1
      reward.latest = Math.max(reward.latest, createdAt)
      rewards.set(reason, reward)
    }
  }

  return reasons.flatMap((reason) => {
    const reward = rewards.get(reason)
    if (!reward) return []
    return [reward]
  })
}
