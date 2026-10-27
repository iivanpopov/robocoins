import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { Button, Loader, Typography } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { OwnPlace, Podium } from './-components'
import { useWeeklyLeaderboard } from './-hooks'

import styles from './leaderboard.module.css'

export function LeaderboardPreview() {
  const { state, queries, functions } = useWeeklyLeaderboard(3)
  const t = useTranslate()

  return (
    <section className={styles.preview} aria-labelledby="leaderboard-preview-title">
      <div className={styles.heading}>
        <Typography id="leaderboard-preview-title" className={styles.title} variant="subtitle">
          {t('leaderboard.title')}
        </Typography>
        <Button
          className={styles['all-button']}
          variant="link"
          nativeButton={false}
          render={<Link to="/leaderboard" />}
        >
          {t('leaderboard.all')}
          <span aria-hidden="true" className="i-ph:caret-right-bold" />
        </Button>
      </div>
      <p className={styles.description}>{t('leaderboard.description')}</p>
      {queries.leaderboard.isPending && (
        <Loader grow role="status" aria-label={t('leaderboard.loading')} />
      )}
      {queries.leaderboard.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={queries.leaderboard.isFetching}>
          {t('leaderboard.error')}
        </InlineError>
      )}
      {queries.leaderboard.isSuccess && !state.entries.length && (
        <p className={styles.description}>{t('leaderboard.empty')}</p>
      )}
      {!!state.entries.length && <Podium entries={state.entries} studentId={state.studentId} />}
      {!state.isInPreview && (
        <div className={styles.own}>
          {queries.rank.isPending && (
            <Loader grow role="status" aria-label={t('leaderboard.loading')} />
          )}
          {queries.rank.isError && (
            <InlineError onRetry={functions.handleRetryRank} isRetrying={queries.rank.isFetching}>
              {t('leaderboard.rank.error')}
            </InlineError>
          )}
          {state.ownEntry && (
            <OwnPlace
              rank={state.ownEntry.rank}
              balance={state.ownEntry.balance}
              neededCoins={state.neededCoins}
            />
          )}
          {queries.rank.isSuccess && !state.ownEntry && (
            <p className={styles.description}>{t('leaderboard.unranked')}</p>
          )}
        </div>
      )}
    </section>
  )
}
