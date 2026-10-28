import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { type ReactNode } from 'react'

import { Button, Loader } from '#/components/ui'
import { InlineError, PageLayout } from '#/routes/-components'
import { formatSignedAmount } from '#/routes/-utils'

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
    <PageLayout.Root aria-label={t('history.title')}>
      <PageLayout.Header align="end" centered>
        {props.backLink}
        <PageLayout.Heading>
          <PageLayout.Title>{t('history.title')}</PageLayout.Title>
          {props.studentName && (
            <PageLayout.Description>{props.studentName}</PageLayout.Description>
          )}
        </PageLayout.Heading>
      </PageLayout.Header>
      {queries.history.isPending && (
        <div role="status" aria-label={t('history.loading')}>
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
              {transaction.operation === 'deposit' && formatSignedAmount(transaction.amount)}
              {transaction.operation !== 'deposit' && formatSignedAmount(-transaction.amount)}
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
        <div role="status" aria-label={t('history.loading')}>
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
    </PageLayout.Root>
  )
}
