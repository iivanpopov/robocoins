import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { IconButton, Loader, Typography } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { LeaderboardRow, OwnPlace, Podium } from '../-components/leaderboard'
import { useLeaderboardPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_student/leaderboard/')({
  head: () => ({ meta: [{ title: 'Рейтинг тижня | Robocoins' }] }),
  component: LeaderboardPage,
})

function LeaderboardPage() {
  const { refs, state, queries, functions } = useLeaderboardPage()
  const t = useTranslate()
  const entries = state.entries.filter((entry) => entry.rank > 3)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <IconButton nativeButton={false} render={<Link to="/" />} title={t('navigation.home')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <Typography variant="subtitle">{t('leaderboard.title')}</Typography>
      </header>
      <p className={styles.description}>{t('leaderboard.description')}</p>
      {queries.rank.isPending && (
        <Loader grow role="status" aria-label={t('leaderboard.loading')} />
      )}
      {queries.rank.isError && (
        <InlineError onRetry={functions.handleRetryRank} isRetrying={queries.rank.isFetching}>
          {t('leaderboard.rank.error')}
        </InlineError>
      )}
      {queries.leaderboard.isPending && (
        <Loader grow role="status" aria-label={t('leaderboard.loading')} />
      )}
      {queries.leaderboard.isSuccess && !state.entries.length && (
        <p className={styles.description}>{t('leaderboard.empty')}</p>
      )}
      {!!state.entries.length && <Podium entries={state.entries} studentId={state.studentId} />}
      {state.ownEntry && state.ownEntry.rank > 3 && (
        <div className={styles.sticky}>
          <OwnPlace
            rank={state.ownEntry.rank}
            balance={state.ownEntry.balance}
            neededCoins={state.neededCoins}
          />
        </div>
      )}
      {queries.rank.isSuccess && !state.ownEntry && (
        <p className={styles.description}>{t('leaderboard.unranked')}</p>
      )}
      {!!entries.length && (
        <ol className={styles.list} aria-label={t('leaderboard.title')}>
          {entries.map((entry) => (
            <li
              key={entry.student_id}
              className={cn(entry.student_id === state.studentId && styles.current)}
            >
              <LeaderboardRow entry={entry} isCurrent={entry.student_id === state.studentId} />
            </li>
          ))}
        </ol>
      )}
      {queries.leaderboard.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={queries.leaderboard.isFetching}>
          {t('leaderboard.error')}
        </InlineError>
      )}
      {queries.leaderboard.hasNextPage && (
        <div ref={refs.sentinel} className={styles.sentinel} aria-hidden="true" />
      )}
      {queries.leaderboard.isFetchingNextPage && (
        <Loader grow role="status" aria-label={t('leaderboard.loading')} />
      )}
    </main>
  )
}
