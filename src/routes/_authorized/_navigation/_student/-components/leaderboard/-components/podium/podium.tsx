import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { BalanceLeaderboardEntry } from '#/api/types'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

import styles from './podium.module.css'

export interface PodiumProps {
  entries: BalanceLeaderboardEntry[]
  studentId: number
}

export function Podium(props: PodiumProps) {
  const t = useTranslate()
  const entries = props.entries
    .filter((entry) => entry.rank >= 1 && entry.rank <= 3)
    .toSorted((entry, otherEntry) => entry.rank - otherEntry.rank)

  return (
    <ol className={styles.podium} aria-label={t('leaderboard.podium')}>
      {entries.map((entry) => (
        <li
          key={entry.student_id}
          className={cn(styles.place, entry.student_id === props.studentId && styles.current)}
          data-place={entry.rank}
        >
          <span className={styles['sr-only']}>{t('leaderboard.rank', { rank: entry.rank })}</span>
          <span className={styles.figure}>
            <Avatar size="lg" className={styles.avatar}>
              <AvatarImage
                src={getAvatarUrl(entry.avatar as AvatarName)}
                alt=""
                aria-hidden="true"
              />
              <AvatarFallback>{getInitial(entry.name)}</AvatarFallback>
            </Avatar>
            {entry.rank === 1 && (
              <span aria-hidden="true" className={cn('i-ph:crown-fill', styles.crown)} />
            )}
          </span>
          <span className={styles.name}>{entry.name}</span>
          <strong
            className={styles.points}
            aria-label={t('leaderboard.points.label', { count: entry.balance })}
          >
            {t('leaderboard.points', { count: entry.balance })}
            <span aria-hidden="true" className={cn('i-ph:coin-fill', styles.coin)} />
          </strong>
          <span aria-hidden="true" className={styles.step}>
            <span className={styles['step-rank']}>{entry.rank}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
