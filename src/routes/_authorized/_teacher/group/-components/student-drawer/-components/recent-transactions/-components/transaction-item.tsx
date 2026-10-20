import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { useRef } from 'react'

import { BalanceTransactionResponse } from '#/api/types'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'

import { useTransactionSwipe } from '../-hooks'

import styles from './transaction-item.module.css'

interface TransactionItemProps {
  transaction: BalanceTransactionResponse
  enabled: boolean
}

export function TransactionItem(props: TransactionItemProps) {
  const t = useTranslate()
  const elementReference = useRef<HTMLDivElement>(null)
  const swipe = useTransactionSwipe(
    {
      transactionId: props.transaction.id,
      studentId: props.transaction.student_id,
      enabled: props.enabled,
    },
    elementReference,
  )
  const isPlus = props.transaction.operation === 'deposit'

  return (
    <div
      ref={elementReference}
      className={cn(
        styles.container,
        swipe.offset > 0 && styles.swiping,
        swipe.isReady && styles.ready,
      )}
      data-base-ui-swipe-ignore="x"
    >
      <span aria-hidden="true" className={styles['undo-indicator']}>
        <span className="i-ph:arrow-counter-clockwise" />
      </span>
      <div
        className={cn(styles.item, swipe.isDragging && styles.dragging)}
        style={{ transform: `translateX(${-swipe.offset}px)` }}
      >
        <span
          className={cn(
            styles.amount,
            isPlus && styles['amount-plus'],
            !isPlus && styles['amount-minus'],
          )}
        >
          {isPlus && '+'}
          {!isPlus && '−'}
          {props.transaction.amount}
        </span>
        <div className={styles.details}>
          <span className={styles.reason}>
            {t.unsafe(`reason.${props.transaction.reason}`, {
              fallback: props.transaction.reason ?? '',
            })}
          </span>
          <span className={styles.time}>
            {new Date(props.transaction.created_at).toLocaleString(UKRAINIAN_LOCALE)}
          </span>
        </div>
      </div>
    </div>
  )
}
