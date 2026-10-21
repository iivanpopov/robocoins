import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { AnimationEvent, useRef } from 'react'

import { BalanceTransactionResponse } from '#/api/types'

import { useTransactionSwipe } from '../-hooks'

import styles from './transaction-item.module.css'

interface TransactionItemProps {
  transaction: BalanceTransactionResponse
  enabled: boolean
  isExiting: boolean
  onCancel: (transactionId: number) => void
  onExitComplete: (transactionId: number) => void
}

export function TransactionItem(props: TransactionItemProps) {
  const t = useTranslate()

  const elementReference = useRef<HTMLDivElement>(null)

  const swipe = useTransactionSwipe(
    {
      enabled: props.enabled && !props.transaction.cancelled_at,
      onCancel: handleCancel,
    },
    elementReference,
  )

  function handleCancel() {
    props.onCancel(props.transaction.id)
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || !props.isExiting) return

    props.onExitComplete(props.transaction.id)
  }

  const isPlus = props.transaction.operation === 'deposit'

  return (
    <div
      ref={elementReference}
      className={cn(
        styles.container,
        swipe.isReady && styles.ready,
        props.isExiting && styles.exiting,
      )}
      data-base-ui-swipe-ignore="x"
    >
      <span aria-hidden="true" className={styles['undo-indicator']}>
        <span className="i-ph:arrow-counter-clockwise" />
      </span>
      <div
        className={cn(styles.item, swipe.isDragging && styles.dragging)}
        style={{ transform: `translateX(${-swipe.offset}px)` }}
        onAnimationEnd={handleAnimationEnd}
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
            {(props.transaction.reason ?? [])
              .map((reason) => t.unsafe(`reason.${reason}`))
              .join(', ')}
          </span>
          <span className={styles.time}>
            {t.date(new Date(props.transaction.created_at), {
              dateStyle: 'short',
              timeStyle: 'short',
              timeZone: 'UTC',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
