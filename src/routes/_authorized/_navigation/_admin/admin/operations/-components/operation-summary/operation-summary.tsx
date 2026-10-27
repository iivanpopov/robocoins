import { useTranslate } from '@kanjou/react'

import { Button, Loader } from '#/components/ui'

import styles from './operation-summary.module.css'

export interface OperationSummaryProps {
  successCount: number
  failureCount: number
  unknownCount: number
  retryableCount: number
  pendingCount: number
  hasUnresolvedUnknown: boolean
  canAcknowledgeUnknown: boolean
  isRunning: boolean
  refreshError: boolean
  isRefreshing: boolean
  onRetryFailed: () => void
  onAcknowledgeUnknown: () => void
  onRefreshData: () => void
}

export function OperationSummary({
  successCount,
  failureCount,
  unknownCount,
  retryableCount,
  pendingCount,
  hasUnresolvedUnknown,
  canAcknowledgeUnknown,
  isRunning,
  refreshError,
  isRefreshing,
  onRetryFailed,
  onAcknowledgeUnknown,
  onRefreshData,
}: OperationSummaryProps) {
  const t = useTranslate()

  return (
    <div className={styles.summary}>
      <div className={styles.counts}>
        <span className={styles.count}>
          {t('admin.operations.result.success-count', { count: successCount })}
        </span>
        <span className={styles.count}>
          {t('admin.operations.result.failure-count', { count: failureCount })}
        </span>
        <span className={styles.count}>
          {t('admin.operations.result.unknown-count', { count: unknownCount })}
        </span>
      </div>

      {isRunning && (
        <div className={styles.notice} role="status">
          <Loader />
          <span>{t('admin.operations.result.running', { pending: pendingCount })}</span>
        </div>
      )}

      {hasUnresolvedUnknown && (
        <p className={styles.warning}>{t('admin.operations.result.unknown-blocked')}</p>
      )}

      {canAcknowledgeUnknown && (
        <Button variant="ghost" onClick={onAcknowledgeUnknown} disabled={isRunning}>
          {t('admin.operations.result.acknowledge')}
        </Button>
      )}

      {!hasUnresolvedUnknown && !!unknownCount && (
        <p className={styles.note}>{t('admin.operations.result.unknown-note')}</p>
      )}

      {refreshError && (
        <div className={styles.refresh} role="alert">
          <p>{t('admin.operations.result.refresh-error')}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefreshData}
            disabled={isRefreshing}
            aria-busy={isRefreshing}
          >
            {isRefreshing && <Loader />}
            {t('admin.balance.refresh.action')}
          </Button>
        </div>
      )}

      {!!retryableCount && (
        <Button variant="ghost" onClick={onRetryFailed} disabled={isRunning} aria-busy={isRunning}>
          {t('admin.operations.result.retry', { count: retryableCount })}
        </Button>
      )}

      {!!failureCount && !retryableCount && (
        <p className={styles.note}>{t('admin.operations.result.no-retry')}</p>
      )}
    </div>
  )
}
