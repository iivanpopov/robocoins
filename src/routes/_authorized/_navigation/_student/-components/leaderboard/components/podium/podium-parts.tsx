import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { BalanceLeaderboardEntry } from '#/api/types'
import { UserAvatar } from '#/routes/-components/user-avatar'

export interface PodiumViewProps {
  entries: BalanceLeaderboardEntry[]
  studentId: number
}

export interface PodiumAvatarProps {
  entry: BalanceLeaderboardEntry
  className?: string
}

export interface PodiumPointsProps {
  entry: BalanceLeaderboardEntry
  className?: string
  coinClassName?: string
}

export function PodiumAvatar(props: PodiumAvatarProps) {
  return (
    <UserAvatar
      name={props.entry.name}
      avatar={props.entry.avatar}
      size="lg"
      className={props.className}
    />
  )
}

export function PodiumPoints(props: PodiumPointsProps) {
  const t = useTranslate()

  return (
    <strong
      className={props.className}
      aria-label={t('leaderboard.points.label', { count: props.entry.balance })}
    >
      <span aria-hidden="true" className={cn('i-ph:coin', props.coinClassName)} />
      {t('coins.amount', { count: props.entry.balance })}
    </strong>
  )
}
