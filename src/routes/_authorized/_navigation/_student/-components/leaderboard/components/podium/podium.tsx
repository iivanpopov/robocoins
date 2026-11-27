import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import type { BalanceLeaderboardEntry } from '#/api/types'
import { UserAvatar } from '#/routes/-components/user-avatar'
import { cn } from '#/utils/cn'

import { PodiumPoints } from './components'

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
          <span className={styles['sr-only']}>{t('ranking.place', { rank: entry.rank })}</span>
          <span className={styles.figure}>
            <Link
              className={styles['avatar-link']}
              to="/student/$studentId"
              params={{ studentId: entry.student_id }}
              aria-label={t('profile.open-label', { name: entry.name })}
            >
              <UserAvatar
                name={entry.name}
                avatar={entry.avatar}
                size="lg"
                className={styles.avatar}
              />
            </Link>
            {entry.rank === 1 && (
              <span aria-hidden="true" className={cn('i-ph:crown', styles.crown)} />
            )}
          </span>
          <span className={styles.meta}>
            <span className={styles.name}>{entry.name}</span>
            <PodiumPoints balance={entry.balance} />
          </span>
          <span aria-hidden="true" className={styles.step}>
            <span className={styles['step-rank']}>{entry.rank}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
