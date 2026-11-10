import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { BalanceLeaderboardEntry } from '#/api/types'
import { UserAvatar } from '#/routes/-components/user-avatar'

import styles from './leaderboard-row.module.css'

export interface LeaderboardRowProps {
  entry: BalanceLeaderboardEntry
  isCurrent: boolean
}

export function LeaderboardRow({ entry, isCurrent }: LeaderboardRowProps) {
  const t = useTranslate()

  return (
    <div className={cn(styles.row, isCurrent && styles.current)}>
      <span className={styles.rank} aria-label={t('ranking.place', { rank: entry.rank })}>
        {entry.rank <= 3 && <span aria-hidden="true">{['🥇', '🥈', '🥉'][entry.rank - 1]}</span>}
        {entry.rank > 3 && <span aria-hidden="true">#{entry.rank}</span>}
      </span>
      <UserAvatar name={entry.name} avatar={entry.avatar} />
      <span className={styles.name}>
        {entry.name}
        {isCurrent && <span className={styles.badge}>{t('leaderboard.you')}</span>}
      </span>
      <strong
        className={styles.points}
        aria-label={t('leaderboard.points.label', { count: entry.balance })}
      >
        {t('coins.amount', { count: entry.balance })}
        <span aria-hidden="true" className="i-ph:coins" />
      </strong>
    </div>
  )
}
