import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { BalanceLeaderboardEntry } from '#/api/types'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

import styles from './leaderboard-row.module.css'

export interface LeaderboardRowProps {
  entry: BalanceLeaderboardEntry
  isCurrent: boolean
}

export function LeaderboardRow({ entry, isCurrent }: LeaderboardRowProps) {
  const t = useTranslate()

  return (
    <div className={cn(styles.row, isCurrent && styles.current)}>
      <span className={styles.rank} aria-label={t('leaderboard.rank', { rank: entry.rank })}>
        {entry.rank <= 3 && <span aria-hidden="true">{['🥇', '🥈', '🥉'][entry.rank - 1]}</span>}
        {entry.rank > 3 && <span aria-hidden="true">#{entry.rank}</span>}
      </span>
      <Avatar>
        <AvatarImage src={getAvatarUrl(entry.avatar as AvatarName)} alt="" />
        <AvatarFallback>{getInitial(entry.name)}</AvatarFallback>
      </Avatar>
      <span className={styles.name}>
        {entry.name}
        {isCurrent && <span className={styles.badge}>{t('leaderboard.you')}</span>}
      </span>
      <strong
        className={styles.points}
        aria-label={t('leaderboard.points.label', { count: entry.balance })}
      >
        {t('leaderboard.points', { count: entry.balance })}
        <span aria-hidden="true" className="i-ph:coins-bold" />
      </strong>
    </div>
  )
}
