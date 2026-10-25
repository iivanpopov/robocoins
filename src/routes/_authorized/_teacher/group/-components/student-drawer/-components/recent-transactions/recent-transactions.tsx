import { useTranslate } from '@kanjou/react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { TransactionItem } from './-components'
import { useRecentTransactions } from './-hooks'

import styles from './recent-transactions.module.css'

interface RecentTransactionsProps {
  studentId: number
  studentName: string
  groupId: number
  enabled: boolean
  onViewAll: () => void
}

export function RecentTransactions(props: RecentTransactionsProps) {
  const t = useTranslate()
  const { refs, state, queries, mutations, functions } = useRecentTransactions(props)

  return (
    <div className={styles['history-section']}>
      <AlertDialog
        open={props.enabled && state.selectedTransaction !== null}
        onOpenChange={functions.handleDialogOpenChange}
      >
        <AlertDialogContent initialFocus={refs.cancelButton}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('award.cancel.confirm.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {state.selectedTransaction &&
                t('award.cancel.confirm.description', {
                  student: props.studentName,
                  amount: state.selectedTransaction.amount,
                  reason:
                    (state.selectedTransaction.reason ?? [])
                      .map((reason) => t.unsafe(`reason.${reason}`))
                      .join(', ') || t('reason.balance-change'),
                  operation: state.selectedTransaction.operation,
                })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              ref={refs.cancelButton}
              disabled={mutations.cancelTransactionMutation.isPending}
            >
              {t('action.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={functions.handleConfirmCancel}
              disabled={mutations.cancelTransactionMutation.isPending}
              aria-busy={mutations.cancelTransactionMutation.isPending}
            >
              {mutations.cancelTransactionMutation.isPending && <Loader />}
              {t('award.cancel.confirm.action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className={styles['history-header']}>
        <span className={styles['section-label']}>{t('award.history.title')}</span>
        <button
          type="button"
          className={styles['history-all']}
          onClick={props.onViewAll}
          aria-label={t('award.history.view-all')}
        >
          {t('award.history.all')}
          <span aria-hidden="true" className="i-ph:caret-right" />
        </button>
      </div>
      {queries.transactionsQuery.isPending && <Loader className={styles.loader} />}
      {queries.transactionsQuery.isError && (
        <InlineError
          onRetry={functions.handleRetry}
          isRetrying={queries.transactionsQuery.isFetching}
        >
          {t('group.error')}
        </InlineError>
      )}
      {!queries.transactionsQuery.isPending &&
        !queries.transactionsQuery.isError &&
        !state.transactions.length && (
          <div className={styles['history-empty']}>{t('award.history.empty')}</div>
        )}
      <div className={styles['history-list']}>
        {state.transactions.map((transaction) => (
          <TransactionItem
            key={`${transaction.student_id}:${transaction.id}:${props.enabled}`}
            transaction={transaction}
            enabled={
              props.enabled &&
              !state.selectedTransaction &&
              !mutations.cancelTransactionMutation.isPending &&
              state.exitingTransactionId === null
            }
            isExiting={state.exitingTransactionId === transaction.id}
            onCancel={functions.handleCancel}
            onExitComplete={functions.handleExitComplete}
          />
        ))}
      </div>
    </div>
  )
}
