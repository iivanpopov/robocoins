import { useTranslate } from '@kanjou/react'

import { Button, Loader } from '#/components/ui'
import { cn } from '#/utils/cn'

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
  onRetry: () => void
  onReset: () => void
  onLogin: () => void
}

export function MembershipResultPanel(props: MembershipResultPanelProps) {
  const t = useTranslate()

  const hasFailures = props.results.some(
    (result) => result.addition === 'failed' || result.removal === 'failed',
  )
  const hasUnknown = props.results.some(
    (result) => result.addition === 'unknown' || result.removal === 'unknown',
  )
  const hasPartial = props.results.some(
    (result) =>
      (result.addition === 'added' || result.addition === 'skipped') && result.removal === 'failed',
  )
  const hasSessionFailure = props.results.some(
    (result) => result.additionErrorStatus === 401 || result.removalErrorStatus === 401,
  )
  const hasForbiddenFailure = props.results.some(
    (result) => result.additionErrorStatus === 403 || result.removalErrorStatus === 403,
  )
  const hasRetryable = hasFailures || hasUnknown

  let title = t('admin.membership.result.add.title')
  let description = t('admin.membership.result.add.description', {
    target: props.targetGroupName ?? '',
  })

  if (props.mode === 'transfer') {
    title = t('admin.membership.result.transfer.title')
    description = t('admin.membership.result.transfer.description', {
      source: props.sourceGroupName ?? '',
      target: props.targetGroupName ?? '',
    })
  }

  if (props.mode === 'remove') {
    title = t('admin.membership.result.remove.title')
    description = t('admin.membership.result.remove.description', {
      source: props.sourceGroupName ?? '',
    })
  }

  function getAdditionLabel(status: MembershipAdditionStatus) {
    if (status === 'pending') return t('admin.membership.addition.pending')
    if (status === 'added') return t('admin.membership.addition.added')
    if (status === 'skipped') return t('admin.membership.addition.skipped')
    if (status === 'failed') return t('admin.membership.addition.failed')
    if (status === 'unknown') return t('admin.membership.status.unknown')
    return t('admin.membership.status.not-required')
  }

  function getRemovalLabel(status: MembershipRemovalStatus) {
    if (status === 'pending') return t('admin.membership.removal.pending')
    if (status === 'waiting') return t('admin.membership.removal.waiting')
    if (status === 'removed') return t('admin.membership.removal.removed')
    if (status === 'failed') return t('admin.membership.removal.failed')
    if (status === 'unknown') return t('admin.membership.status.unknown')
    return t('admin.membership.status.not-required')
  }

  return (
    <section className={styles.panel} aria-live="polite">
      <header className={styles.header}>
        <span aria-hidden="true" className={cn(styles.icon, 'i-ph:list-checks')} />
        <div className={styles.heading}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </header>

      <ul className={styles.list}>
        {props.results.map((result) => (
          <li key={result.studentId} className={styles.row}>
            <span className={styles.name}>{result.studentName}</span>
            <span className={styles.stages}>
              {props.mode !== 'remove' && (
                <span className={styles.stage} data-status={result.addition}>
                  <span className={styles['stage-label']}>
                    {t('admin.membership.status.addition')}
                  </span>
                  <strong className={styles['stage-value']}>
                    {getAdditionLabel(result.addition)}
                  </strong>
                </span>
              )}
              {props.mode !== 'add' && (
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
          <Button
            type="button"
            onClick={props.onRetry}
            disabled={props.isOperating}
            aria-busy={props.isOperating}
          >
            {props.isOperating && <Loader />}
            {t('admin.membership.result.retry')}
          </Button>
        )}
        <Button type="button" variant="ghost" onClick={props.onReset} disabled={props.isOperating}>
          {t('admin.membership.result.reset')}
        </Button>
        {hasSessionFailure && (
          <Button type="button" variant="ghost" onClick={props.onLogin}>
            {t('navigation.login')}
          </Button>
        )}
      </div>
    </section>
  )
}
