import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { ReactNode } from 'react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Chip,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { AwardDirection } from '#/routes/_authorized/_teacher/group/-constants'

import { useBalanceChange } from './-hooks'

import styles from './balance-change.module.css'

interface BalanceChangeProps {
  studentId: number
  studentName: string
  groupId: number
  enabled: boolean
  onSuccess: () => void
  children: ReactNode
}

export function BalanceChange(props: BalanceChangeProps) {
  const t = useTranslate()
  const { refs, state, queries, mutations, functions } = useBalanceChange(props)

  return (
    <>
      <AlertDialog
        open={props.enabled && state.pendingDeduction !== null}
        onOpenChange={functions.handleDeductionDialogOpenChange}
      >
        <AlertDialogContent initialFocus={refs.cancelButton}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('award.deduct.confirm.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {state.pendingDeduction &&
                t('award.deduct.confirm.description', {
                  student: props.studentName,
                  reason: state.pendingDeduction.reasons
                    .map((reason) => t.unsafe(`reason.${reason}`))
                    .join(', '),
                })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              ref={refs.cancelButton}
              disabled={mutations.createAwardMutation.isPending}
            >
              {t('action.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={functions.handleConfirmDeduction}
              disabled={mutations.createAwardMutation.isPending}
              aria-busy={mutations.createAwardMutation.isPending}
            >
              {mutations.createAwardMutation.isPending && <Loader />}
              {t('award.deduct.confirm.action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className={styles['scroll-area']}>
        {props.children}
        <div ref={refs.swipe} className={styles['reasons-section']} data-base-ui-swipe-ignore="x">
          <span className={styles['section-label']}>{t('award.reason.label')}</span>
          {queries.reasonsQuery.isPending && <Loader grow className={styles.loader} />}
          {queries.reasonsQuery.isError && (
            <InlineError
              onRetry={functions.handleRetryReasons}
              isRetrying={queries.reasonsQuery.isFetching}
            >
              {t('group.error')}
            </InlineError>
          )}
          <div key={state.direction} className={styles['reasons-list']}>
            {state.reasons.map((reason) => (
              <Chip
                key={reason}
                size="lg"
                tone={state.reasonTone}
                disabled={mutations.createAwardMutation.isPending || !!state.pendingDeduction}
                selected={state.selectedReasons.includes(reason)}
                onClick={() => functions.handleReasonClick(reason)}
              >
                {t.unsafe(`reason.${reason}`)}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      <div className={styles['direction-toggle']}>
        <button
          type="button"
          disabled={mutations.createAwardMutation.isPending || !!state.pendingDeduction}
          className={cn(
            styles['direction-btn'],
            state.isPlus && styles['direction-btn-plus-active'],
          )}
          onClick={() => functions.handleDirectionSelect(AwardDirection.Reward)}
          aria-label={t('award.reward')}
          aria-pressed={state.isPlus}
          title={t('award.reward')}
        >
          {mutations.createAwardMutation.isPending && state.isPlus && <Loader />}
          {(!mutations.createAwardMutation.isPending || state.isMinus) && (
            <span aria-hidden="true" className={cn('i-ph:star', styles['coin-icon'])} />
          )}
        </button>
        <button
          type="button"
          disabled={mutations.createAwardMutation.isPending || !!state.pendingDeduction}
          className={cn(
            styles['direction-btn'],
            state.isMinus && styles['direction-btn-minus-active'],
          )}
          onClick={() => functions.handleDirectionSelect(AwardDirection.Punish)}
          aria-label={t('award.punish')}
          aria-pressed={state.isMinus}
          title={t('award.punish')}
        >
          {mutations.createAwardMutation.isPending && state.isMinus && <Loader />}
          {(!mutations.createAwardMutation.isPending || state.isPlus) && (
            <span
              aria-hidden="true"
              className={cn('i-ph:gavel', styles['coin-icon'], styles['punish-icon'])}
            />
          )}
        </button>
      </div>
    </>
  )
}
