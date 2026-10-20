import { useTranslate } from '@kanjou/react'

import { Loader } from '#/components/ui'

import { TransactionItem } from './-components'
import { useRecentTransactions } from './-hooks'

import styles from './recent-transactions.module.css'

interface RecentTransactionsProps {
  studentId: number
  enabled: boolean
  onViewAll: () => void
}

export function RecentTransactions(props: RecentTransactionsProps) {
  const t = useTranslate()
  const { state, queries } = useRecentTransactions(props)

  return (
    <div className={styles['history-section']}>
      <div className={styles['history-header']}>
        <span className={styles['section-label']}>{t('award.history.title')}</span>
        <button
          type="button"
          className={styles['history-all']}
          onClick={props.onViewAll}
          aria-label={t('award.history.view-all')}
        >
          {t('award.history.all')}
          <span aria-hidden="true" className="i-ph:caret-right" />
        </button>
      </div>
      {queries.transactionsQuery.isPending && <Loader />}
      {queries.transactionsQuery.isError && <div role="alert">{t('group.error')}</div>}
      {!queries.transactionsQuery.isPending &&
        !queries.transactionsQuery.isError &&
        !state.transactions.length && (
          <div className={styles['history-empty']}>{t('award.history.empty')}</div>
        )}
      <div className={styles['history-list']}>
        {state.transactions.map((transaction) => (
          <TransactionItem
            key={`${transaction.student_id}:${transaction.id}:${props.enabled}`}
            transaction={transaction}
            enabled={props.enabled}
          />
        ))}
      </div>
    </div>
  )
}
