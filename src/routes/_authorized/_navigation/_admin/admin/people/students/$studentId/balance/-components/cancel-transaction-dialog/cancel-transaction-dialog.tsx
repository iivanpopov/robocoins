import { useTranslate } from '@kanjou/react'

import type { BalanceTransactionResponse } from '#/api/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Loader,
} from '#/components/ui'

import type { ApiErrorKind } from '../../../../-utils'

import styles from './cancel-transaction-dialog.module.css'

export interface CancelTransactionDialogProps {
  open: boolean
  transaction: BalanceTransactionResponse | null
  isPending: boolean
  errorKind: ApiErrorKind | null
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function CancelTransactionDialog(props: CancelTransactionDialogProps) {
  const t = useTranslate()

  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('admin.balance.cancel.confirm.title')}</AlertDialogTitle>
          {!!props.transaction && (
            <AlertDialogDescription>
              {t('admin.balance.cancel.confirm.description', {
                amount: props.transaction.amount,
              })}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {props.errorKind === 'session' && <p className={styles.error}>{t('error.session')}</p>}
        {props.errorKind === 'forbidden' && <p className={styles.error}>{t('error.forbidden')}</p>}
        {props.errorKind === 'other' && (
          <p className={styles.error}>{t('admin.balance.cancel.error')}</p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={props.isPending}>{t('action.cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={props.onConfirm}
            disabled={props.isPending}
            aria-busy={props.isPending}
          >
            {props.isPending && <Loader />}
            {t('balance.cancel.action')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
