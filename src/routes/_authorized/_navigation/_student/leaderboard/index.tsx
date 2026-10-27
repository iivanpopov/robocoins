import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { IconButton, Loader, Typography } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { LeaderboardRow } from '../-components/leaderboard'
import { useLeaderboardPage } from './-hooks'

import leaderboardStyles from '../-components/leaderboard/leaderboard.module.css'
import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_student/leaderboard/')({
  head: () => ({ meta: [{ title: 'Рейтинг тижня | Robocoins' }] }),
  component: LeaderboardPage,
})

function LeaderboardPage() {
  const { refs, state, queries, functions } = useLeaderboardPage()
  const t = useTranslate()

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <IconButton nativeButton={false} render={<Link to="/" />} title={t('leaderboard.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <Typography variant="subtitle">{t('leaderboard.title')}</Typography>
      </header>
      <p className={leaderboardStyles.description}>{t('leaderboard.description')}</p>
      <p className={styles.rules}>{t('leaderboard.rules')}</p>
      {!(state.ownEntry && state.ownEntry.rank <= 3) && (
        <section className={styles.own} aria-labelledby="leaderboard-own-title">
          <h2 id="leaderboard-own-title" className={leaderboardStyles.label}>
            {t('leaderboard.place')}
          </h2>
          {queries.rank.isPending && (
            <Loader grow role="status" aria-label={t('leaderboard.loading')} />
          )}
          {queries.rank.isError && (
            <InlineError onRetry={functions.handleRetryRank} isRetrying={queries.rank.isFetching}>
              {t('leaderboard.rank.error')}
            </InlineError>
          )}
          {state.ownEntry && <LeaderboardRow entry={state.ownEntry} isCurrent />}
          {queries.rank.isSuccess && !state.ownEntry && (
            <p className={leaderboardStyles.description}>{t('leaderboard.unranked')}</p>
          )}
        </section>
      )}
      {queries.leaderboard.isPending && (
        <Loader grow role="status" aria-label={t('leaderboard.loading')} />
      )}
      {queries.leaderboard.isSuccess && !state.entries.length && <p>{t('leaderboard.empty')}</p>}
      <ol className={leaderboardStyles.list} aria-label={t('leaderboard.title')}>
        {state.entries.map((entry) => (
          <li key={entry.student_id}>
            <LeaderboardRow entry={entry} isCurrent={entry.student_id === state.studentId} />
          </li>
        ))}
      </ol>
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
