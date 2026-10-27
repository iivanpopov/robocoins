import type { BalanceLeaderboardEntry } from '#/api/types'

export function findNeighborAbove(entries: BalanceLeaderboardEntry[], rank: number) {
  let closest: BalanceLeaderboardEntry | null = null

  for (const entry of entries) {
    if (entry.rank >= rank) continue
    if (!closest || entry.rank > closest.rank) closest = entry
  }

  return closest
}
