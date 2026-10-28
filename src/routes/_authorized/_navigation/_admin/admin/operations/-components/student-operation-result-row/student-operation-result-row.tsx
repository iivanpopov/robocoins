import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { Button, Loader } from '#/components/ui'
import { formatSignedAmount } from '#/routes/-utils'

import type { StudentOperationResult } from '../../-types'

import styles from './student-operation-result-row.module.css'

export interface StudentOperationResultRowProps {
  result: StudentOperationResult
  isRunning: boolean
  onCheckHistory: (studentId: number) => void
}

export function StudentOperationResultRow({
  result,
  isRunning,
  onCheckHistory,
}: StudentOperationResultRowProps) {
  const t = useTranslate()

  return (
    <li className={styles.item}>
      <div className={styles.top}>
        <span className={styles.name}>{result.studentName}</span>
        <span
          className={cn(
            styles.badge,
            result.status === 'success' && styles.success,
            result.status === 'failure' && styles.failure,
            result.status === 'unknown' && styles.unknown,
            result.status === 'pending' && styles.pending,
          )}
        >
          {result.status === 'success' && t('admin.operations.result.success')}
          {result.status === 'failure' && t('admin.operations.result.failure')}
          {result.status === 'unknown' && t('admin.operations.result.unknown')}
          {result.status === 'pending' && t('admin.operations.result.pending')}
        </span>
      </div>

      {result.status === 'pending' && (
        <div className={styles.progress} role="status">
          <Loader />
          <span>{t('admin.operations.result.processing')}</span>
        </div>
      )}

      {result.status === 'success' && (
        <div className={styles.details}>
          {result.balance !== null && (
            <span className={styles.balance}>
              {t('admin.operations.result.new-balance', { count: result.balance })}
            </span>
          )}
          {result.transactionAmount !== null && (
            <span className={styles.amount}>{formatSignedAmount(result.transactionAmount)}</span>
          )}
          <Link
            to="/admin/people/students/$studentId/balance"
            params={{ studentId: result.studentId }}
            className={styles.link}
          >
            {t('admin.operations.result.open-history')}
          </Link>
        </div>
      )}

      {result.status === 'failure' && (
        <div className={styles.details}>
          {result.errorKey && (
            <p className={styles.error} role="status">
              {t.unsafe(result.errorKey)}
            </p>
          )}
          {result.isRetryable && (
            <span className={styles.note}>{t('admin.operations.result.retryable')}</span>
          )}
          {result.errorKind === 'session' && (
            <Link to="/login" className={styles.link}>
              {t('navigation.login')}
            </Link>
          )}
        </div>
      )}

      {result.status === 'unknown' && (
        <div className={styles.details}>
          <p className={styles.error} role="status">
            {t('admin.operations.result.unknown-description')}
          </p>
          {result.historyCheck === 'idle' && (
            <Button
              variant="ghost"
              size="sm"
              disabled={isRunning}
              onClick={() => onCheckHistory(result.studentId)}
            >
              {t('admin.balance.unknown.verify')}
            </Button>
          )}
          {result.historyCheck === 'checking' && (
            <span className={styles.progress} role="status">
              <Loader />
              {t('admin.operations.result.checking')}
            </span>
          )}
          {result.historyCheck === 'error' && (
            <>
              <p className={styles.error}>{t('admin.balance.unknown.verify-error')}</p>
              <Button
                variant="ghost"
                size="sm"
                disabled={isRunning}
                onClick={() => onCheckHistory(result.studentId)}
              >
                {t('admin.operations.result.check-again')}
              </Button>
            </>
          )}
          {result.historyCheck === 'checked' && (
            <>
              {result.historyAcknowledged && (
                <p className={styles['success-text']}>
                  {t('admin.operations.result.history-acknowledged')}
                </p>
              )}
              {!result.historyAcknowledged && (
                <p className={styles['success-text']}>
                  {t('admin.operations.result.history-checked')}
                </p>
              )}
              <Link
                to="/admin/people/students/$studentId/balance"
                params={{ studentId: result.studentId }}
                className={styles.link}
              >
                {t('admin.operations.result.open-history')}
              </Link>
            </>
          )}
        </div>
      )}
    </li>
  )
}
