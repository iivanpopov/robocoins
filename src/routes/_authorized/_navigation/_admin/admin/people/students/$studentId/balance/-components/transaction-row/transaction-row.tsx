import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { BalanceTransactionResponse } from '#/api/types'
import { Button } from '#/components/ui'
import { formatSignedAmount } from '#/routes/-utils'

import styles from './transaction-row.module.css'

export interface TransactionRowProps {
  transaction: BalanceTransactionResponse
  cancelDisabled: boolean
  onCancel: (transaction: BalanceTransactionResponse) => void
}

export function TransactionRow(props: TransactionRowProps) {
  const t = useTranslate()

  const isDeposit = props.transaction.operation === 'deposit'
  const isCancelled = !!props.transaction.cancelled_at
  const reasons = props.transaction.reason ?? []

  return (
    <li className={cn(styles.item, isCancelled && styles.cancelled)}>
      <div className={styles.top}>
        <span
          className={cn(styles.amount, isDeposit && styles.deposit, !isDeposit && styles.deduct)}
        >
          {isDeposit && formatSignedAmount(props.transaction.amount)}
          {!isDeposit && formatSignedAmount(-props.transaction.amount)}
        </span>
        <time dateTime={props.transaction.created_at} className={styles.date}>
          {t('history.date', { date: new Date(props.transaction.created_at) })}
        </time>
      </div>

      <p className={styles.reasons}>
        {!!reasons.length && reasons.map((reason) => t.unsafe(`reason.${reason}`)).join(', ')}
        {!reasons.length && t('history.no-reason')}
      </p>

      <div className={styles.footer}>
        {isCancelled && <span className={styles.badge}>{t('history.cancelled')}</span>}
        {!isCancelled && (
          <Button
            variant="ghost"
            size="sm"
            disabled={props.cancelDisabled}
            aria-label={t('admin.balance.cancel.trigger', {
              amount: props.transaction.amount,
            })}
            onClick={() => props.onCancel(props.transaction)}
          >
            <span aria-hidden="true" className="i-ph:arrow-counter-clockwise" />
            {t('action.cancel')}
          </Button>
        )}
      </div>
    </li>
  )
}
