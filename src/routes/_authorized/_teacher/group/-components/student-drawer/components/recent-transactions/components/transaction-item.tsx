import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { AnimationEvent, useRef } from 'react'

import { BalanceTransactionResponse } from '#/api/types'
import { formatSignedAmount } from '#/routes/-utils'
import { isTransactionCancellable } from '#/routes/_authorized/-utils'

import { useTransactionSwipe, useTransactionTime } from '../hooks'

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
  const transactionTime = useTransactionTime(props.transaction.created_at)

  const isCancellable = isTransactionCancellable(
    props.transaction,
    props.enabled && !props.transaction.cancelled_at,
  )

  const swipe = useTransactionSwipe(
    {
      enabled: isCancellable,
      onCancel: handleConfirmCancel,
    },
    elementReference,
  )

  const isLocked = props.enabled && !props.transaction.cancelled_at && !isCancellable

  function handleConfirmCancel() {
    if (!swipe.isArmed) return

    props.onCancel(props.transaction.id)
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || !props.isExiting) return

    props.onExitComplete(props.transaction.id)
  }

  const isPlus = props.transaction.operation === 'deposit'
  const confirmSurfaceTransform = swipe.isConfirming
    ? 'translateX(0)'
    : `translateX(calc(100% - ${swipe.offset}px))`

  return (
    <div
      ref={elementReference}
      className={cn(
        styles.container,
        swipe.isReady && styles.ready,
        swipe.isConfirming && styles.confirming,
        props.isExiting && styles.exiting,
      )}
      data-base-ui-swipe-ignore="x"
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={cn(styles['confirm-surface'], swipe.isDragging && styles.dragging)}
        style={{ transform: confirmSurfaceTransform }}
      >
        <span aria-hidden="true" className={styles['confirm-indicator']}>
          <span className="i-ph:arrow-counter-clockwise" />
        </span>
        <button
          type="button"
          disabled={!swipe.isArmed}
          onClick={handleConfirmCancel}
          aria-label={t('award.cancel.confirm.trigger', { amount: props.transaction.amount })}
          className={styles['confirm-action']}
          data-confirm-action=""
        >
          {t('balance.cancel.action')}
        </button>
      </div>
      <button
        type="button"
        disabled={!props.enabled || !!props.transaction.cancelled_at}
        className={cn(styles.item, swipe.isDragging && styles.dragging)}
        inert={swipe.isDragging || swipe.isConfirming || props.isExiting}
      >
        <span
          className={cn(
            styles.amount,
            isPlus && styles['amount-plus'],
            !isPlus && styles['amount-minus'],
          )}
        >
          {isPlus && formatSignedAmount(props.transaction.amount, true)}
          {!isPlus && formatSignedAmount(-props.transaction.amount, true)}
        </span>
        <div className={styles.details}>
          <span className={styles.reason}>
            {(props.transaction.reason ?? [])
              .map((reason) => t.unsafe(`reason.${reason}`))
              .join(', ')}
          </span>
          <time
            dateTime={props.transaction.created_at}
            title={t('history.date', { date: new Date(props.transaction.created_at) })}
            className={styles.time}
          >
            {transactionTime.label}
          </time>
        </div>
        {isLocked && (
          <span
            aria-hidden="true"
            title={t('award.cancel.locked')}
            className={cn('i-ph:lock', styles['lock-indicator'])}
          />
        )}
      </button>
    </div>
  )
}
