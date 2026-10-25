import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { type ReactNode } from 'react'

import { Button, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { useRewardHistory } from './-hooks'

import styles from './reward-history.module.css'

interface RewardHistoryProps {
  studentId: number
  studentName?: string
  backLink: ReactNode
}

export function RewardHistory(props: RewardHistoryProps) {
  const { refs, state, queries, functions } = useRewardHistory(props.studentId)
  const t = useTranslate()

  return (
    <section className={styles.page} aria-label={t('history.title')}>
      <header className={styles.header}>
        {props.backLink}
        <h1>{t('history.title')}</h1>
      </header>
      {props.studentName && <p className={styles.name}>{props.studentName}</p>}
      {queries.history.isPending && (
        <div role="status" aria-label={t('profile.history.loading')}>
          <Loader />
        </div>
      )}
      {queries.history.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={queries.history.isFetching}>
          {t('history.error')}
        </InlineError>
      )}
      {queries.history.isSuccess && !state.transactions.length && (
        <p role="status">{t('profile.history.empty')}</p>
      )}
      <ol className={styles.list}>
        {state.transactions.map((transaction) => (
          <li key={transaction.id} className={styles.transaction}>
            <time dateTime={transaction.created_at} className={styles.date}>
              {t('history.date', { date: new Date(transaction.created_at) })}
            </time>
            <strong
              className={cn(
                styles.amount,
                transaction.operation === 'deposit' && styles.deposit,
                !!transaction.cancelled_at && styles.cancelled,
              )}
            >
              {transaction.operation === 'deposit' &&
                t('profile.history.amount', { count: transaction.amount })}
              {transaction.operation !== 'deposit' &&
                t('profile.history.amount', { count: -transaction.amount })}
            </strong>
            <ul className={styles.reasons}>
              {(transaction.reason ?? []).map((reason, i) => (
                <li key={`${reason}-${i}`}>{t.unsafe(`reason.${reason}`)}</li>
              ))}
              {!transaction.reason?.length && <li>{t('history.no-reason')}</li>}
            </ul>
            {transaction.cancelled_at && (
              <span className={styles.status}>{t('history.cancelled')}</span>
            )}
          </li>
        ))}
      </ol>
      <div ref={refs.sentinel} aria-hidden="true" />
      {queries.history.isFetchingNextPage && (
        <div role="status" aria-label={t('profile.history.loading')}>
          <Loader />
        </div>
      )}
      {queries.history.hasNextPage && !queries.history.isError && (
        <Button
          onClick={functions.handleLoadMore}
          disabled={queries.history.isFetching}
          aria-busy={queries.history.isFetchingNextPage}
        >
          {t('history.load-more')}
        </Button>
      )}
      {queries.history.isSuccess && !queries.history.hasNextPage && !!state.transactions.length && (
        <p className={styles.status} role="status">
          {t('history.end')}
        </p>
      )}
    </section>
  )
}
