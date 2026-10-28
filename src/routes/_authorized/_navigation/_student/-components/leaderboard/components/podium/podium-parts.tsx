import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { BalanceLeaderboardEntry } from '#/api/types'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

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
    <Avatar size="lg" className={props.className}>
      <AvatarImage src={getAvatarUrl(props.entry.avatar as AvatarName)} alt="" aria-hidden="true" />
      <AvatarFallback>{getInitial(props.entry.name)}</AvatarFallback>
    </Avatar>
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
