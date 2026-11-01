import { getKyivDate } from '#/routes/-utils'

export function getTransactionTime(createdAt: string, now: number) {
  const minutes = Math.max(0, Math.floor((now - Date.parse(createdAt)) / 60_000))

  if (minutes <= 110) return { kind: 'relative', minutes } as const

  const days = getKyivDate(createdAt).until(getKyivDate(now)).days

  if (!days) return { kind: 'today' } as const
  if (days === 1) return { kind: 'yesterday' } as const

  return { kind: 'date' } as const
}
