import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Mascot } from '#/components/mascot'
import { Button, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { formatSignedAmount } from '#/routes/-utils'

import { ReasonIcon } from '../reason-icon'

import styles from './history-preview.module.css'

const PREVIEW_LIMIT = 3

export interface HistoryTransaction {
  id: number
  isDeposit: boolean
  isNew: boolean
  signedAmount: number
  reason: string[] | null
}

export interface HistoryGroup {
  date: string
  transactions: HistoryTransaction[]
}

export interface HistoryPreviewProps {
  groups: HistoryGroup[]
  isPending: boolean
  isError: boolean
  isFetching: boolean
  onRetry: () => void
  onViewAll: () => void
}

export function HistoryPreview(props: HistoryPreviewProps) {
  const t = useTranslate()
  const recent = props.groups
    .flatMap((group) =>
      group.transactions.map((transaction) => ({ transaction, dateLabel: group.date })),
    )
    .slice(0, PREVIEW_LIMIT)
  const items = recent.map((item, i) => ({
    ...item,
    showDate: recent[i - 1]?.dateLabel !== item.dateLabel,
  }))

  return (
    <section className={styles.history} aria-labelledby="history-preview-title">
      <div className={styles.heading}>
        <h2 id="history-preview-title" className={styles.title}>
          {t('profile.history.title')}
        </h2>
        {!!items.length && (
          <Button variant="link" className={styles.all} onClick={props.onViewAll}>
            {t('profile.history.all')}
            <span aria-hidden="true" className="i-ph:caret-right" />
          </Button>
        )}
      </div>
      {props.isPending && (
        <div className={styles.loading} role="status" aria-label={t('history.loading')}>
          <Loader grow />
        </div>
      )}
      {props.isError && (
        <InlineError onRetry={props.onRetry} isRetrying={props.isFetching}>
          {t('group.error')}
        </InlineError>
      )}
      {!props.isPending && !props.isError && !items.length && (
        <div className={styles.empty}>
          <Mascot mood="support" size={120} className={styles['empty-mascot']} />
          <p className={styles['empty-text']}>{t('profile.history.empty.mascot')}</p>
        </div>
      )}
      {!!items.length && (
        <ul className={styles.list}>
          {items.map((item) => (
            <li
              key={item.transaction.id}
              className={styles.row}
              data-reward={item.transaction.isNew && item.transaction.isDeposit}
            >
              <span
                aria-hidden="true"
                className={cn(
                  styles.icon,
                  item.transaction.isDeposit && styles.reward,
                  !item.transaction.isDeposit && styles.penalty,
                )}
              >
                <ReasonIcon reason={item.transaction.reason?.[0]} />
              </span>
              <span className={styles.body}>
                <span className={styles.reason}>
                  {!item.transaction.reason?.length && t('history.no-reason')}
                  {(item.transaction.reason ?? []).map((reason, i) => (
                    <span key={`${reason}-${i}`}>
                      {i > 0 && ', '}
                      {t.unsafe(`reason.${reason}`, { fallback: reason })}
                    </span>
                  ))}
                </span>
                {item.showDate && <span className={styles.date}>{item.dateLabel}</span>}
              </span>
              <span
                className={cn(
                  styles.amount,
                  item.transaction.isDeposit && styles['amount-deposit'],
                )}
              >
                {formatSignedAmount(item.transaction.signedAmount)}
                <span aria-hidden="true" className={cn('i-ph:coin', styles['amount-coin'])} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
