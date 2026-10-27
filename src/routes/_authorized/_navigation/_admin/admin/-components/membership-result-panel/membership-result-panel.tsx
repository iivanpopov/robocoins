import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Button, Loader } from '#/components/ui'

import type {
  MembershipAdditionStatus,
  MembershipOperationMode,
  MembershipOperationResult,
  MembershipRemovalStatus,
} from '../../-types'

import styles from './membership-result-panel.module.css'

export interface MembershipResultPanelProps {
  mode: MembershipOperationMode
  results: MembershipOperationResult[]
  sourceGroupName: string | null
  targetGroupName: string | null
  isOperating: boolean
  hasFailures: boolean
  hasUnknown: boolean
  hasPartial: boolean
  hasSessionFailure: boolean
  hasForbiddenFailure: boolean
  onRetry: () => void
  onReset: () => void
  onLogin: () => void
}

export function MembershipResultPanel({
  mode,
  results,
  sourceGroupName,
  targetGroupName,
  isOperating,
  hasFailures,
  hasUnknown,
  hasPartial,
  hasSessionFailure,
  hasForbiddenFailure,
  onRetry,
  onReset,
  onLogin,
}: MembershipResultPanelProps) {
  const t = useTranslate()

  function getAdditionLabel(status: MembershipAdditionStatus) {
    if (status === 'pending') return t('admin.membership.addition.pending')
    if (status === 'added') return t('admin.membership.addition.added')
    if (status === 'skipped') return t('admin.membership.addition.skipped')
    if (status === 'failed') return t('admin.membership.addition.failed')
    if (status === 'unknown') return t('admin.membership.addition.unknown')
    return t('admin.membership.status.not-required')
  }

  function getRemovalLabel(status: MembershipRemovalStatus) {
    if (status === 'pending') return t('admin.membership.removal.pending')
    if (status === 'waiting') return t('admin.membership.removal.waiting')
    if (status === 'removed') return t('admin.membership.removal.removed')
    if (status === 'failed') return t('admin.membership.removal.failed')
    if (status === 'unknown') return t('admin.membership.removal.unknown')
    return t('admin.membership.status.not-required')
  }

  let title = t('admin.membership.result.add.title')
  let description = t('admin.membership.result.add.description', {
    target: targetGroupName ?? '',
  })

  if (mode === 'transfer') {
    title = t('admin.membership.result.transfer.title')
    description = t('admin.membership.result.transfer.description', {
      source: sourceGroupName ?? '',
      target: targetGroupName ?? '',
    })
  }

  if (mode === 'remove') {
    title = t('admin.membership.result.remove.title')
    description = t('admin.membership.result.remove.description', {
      source: sourceGroupName ?? '',
    })
  }

  const hasRetryable = hasFailures || hasUnknown

  return (
    <section className={styles.panel} aria-live="polite">
      <header className={styles.header}>
        <span aria-hidden="true" className={cn(styles.icon, 'i-ph:list-checks-duotone')} />
        <div className={styles.heading}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </header>

      <ul className={styles.list}>
        {results.map((result) => (
          <li key={result.studentId} className={styles.row}>
            <span className={styles.name}>{result.studentName}</span>
            <span className={styles.stages}>
              {mode !== 'remove' && (
                <span className={styles.stage} data-status={result.addition}>
                  <span className={styles['stage-label']}>
                    {t('admin.membership.status.addition')}
                  </span>
                  <strong className={styles['stage-value']}>
                    {getAdditionLabel(result.addition)}
                  </strong>
                </span>
              )}
              {mode !== 'add' && (
                <span className={styles.stage} data-status={result.removal}>
                  <span className={styles['stage-label']}>
                    {t('admin.membership.status.removal')}
                  </span>
                  <strong className={styles['stage-value']}>
                    {getRemovalLabel(result.removal)}
                  </strong>
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {hasPartial && (
        <p role="alert" className={styles.partial}>
          {t('admin.membership.result.partial')}
        </p>
      )}
      {hasFailures && (
        <p role="alert" className={styles.failure}>
          {t('admin.membership.result.failure')}
        </p>
      )}
      {hasUnknown && (
        <p role="alert" className={styles.unknown}>
          {t('admin.membership.result.unknown')}
        </p>
      )}
      {hasSessionFailure && (
        <p role="alert" className={styles.failure}>
          {t('admin.membership.result.session')}
        </p>
      )}
      {hasForbiddenFailure && (
        <p role="alert" className={styles.failure}>
          {t('admin.membership.result.forbidden')}
        </p>
      )}

      <div className={styles.actions}>
        {hasRetryable && (
          <Button onClick={onRetry} disabled={isOperating} aria-busy={isOperating}>
            {isOperating && <Loader />}
            {t('admin.membership.result.retry')}
          </Button>
        )}
        <Button variant="ghost" onClick={onReset} disabled={isOperating}>
          {t('admin.membership.result.reset')}
        </Button>
        {hasSessionFailure && (
          <Button variant="ghost" onClick={onLogin}>
            {t('students.action.login')}
          </Button>
        )}
      </div>
    </section>
  )
}
