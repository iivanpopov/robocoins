import { getKyivDate } from '#/utils/date'

export function getTransactionTime(createdAt: string, now: number) {
  const minutes = Math.max(0, Math.floor((now - Date.parse(createdAt)) / 60_000))

  if (minutes <= 110) return { kind: 'relative', minutes } as const

  const days = (Date.parse(getKyivDate(now)) - Date.parse(getKyivDate(createdAt))) / 86_400_000

  if (!days) return { kind: 'today' } as const
  if (days === 1) return { kind: 'yesterday' } as const

  return { kind: 'date' } as const
}
