import { useTranslate } from '@kanjou/react'
import { useQueryClient } from '@tanstack/react-query'
import { useLoaderData, useParams } from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { useCancelStudentTransactionStudentTransactionsTransactionIdCancelPost } from '#/api/hooks/useCancelStudentTransactionStudentTransactionsTransactionIdCancelPost'
import { getGroupByIdGroupIdGroupIdGetQueryKey } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import type { BalanceTransactionResponse } from '#/api/types'
import { toast } from '#/components/ui'
import { getRewardHistoryQueryOptions } from '#/routes/_authorized/-components/reward-history'
import { isTransactionCancellable } from '#/routes/_authorized/-utils'

export function useStudentHistoryPage() {
  const params = useParams({
    from: '/_authorized/_teacher/group/$groupId_/student/$studentId/history/',
  })
  const student = useLoaderData({
    from: '/_authorized/_teacher/group/$groupId_/student/$studentId/history/',
  })
  const t = useTranslate()
  const queryClient = useQueryClient()

  const [transaction, setTransaction] = useState<BalanceTransactionResponse | null>(null)
  const cancellingReference = useRef(false)

  const cancelTransactionMutation =
    useCancelStudentTransactionStudentTransactionsTransactionIdCancelPost({
      mutation: {
        onSuccess: async () => {
          setTransaction(null)
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
                path: { student_id: student.id },
              }),
            }),
            queryClient.invalidateQueries({
              queryKey: getGroupByIdGroupIdGroupIdGetQueryKey({
                path: { group_id: params.groupId },
              }),
            }),
          ])
        },
        onError: () => {
          toast.add({ title: t('award.cancel.error'), type: 'error' })
        },
        onSettled: () => {
          cancellingReference.current = false
        },
      },
    })

  function handleCancel(transactionId: number) {
    if (cancellingReference.current || cancelTransactionMutation.isPending) return

    const history = queryClient.getQueryData(getRewardHistoryQueryOptions(student.id).queryKey)
    const selectedTransaction = history?.pages
      .flatMap((page) => page.transactions)
      .find((value) => value.id === transactionId)

    if (
      !selectedTransaction ||
      selectedTransaction.student_id !== student.id ||
      !isTransactionCancellable(selectedTransaction, true)
    )
      return

    setTransaction(selectedTransaction)
  }

  function handleConfirmCancel() {
    if (cancellingReference.current || cancelTransactionMutation.isPending || !transaction) return
    if (!isTransactionCancellable(transaction, true)) {
      setTransaction(null)
      toast.add({ title: t('award.cancel.locked'), type: 'error' })
      return
    }

    cancellingReference.current = true
    cancelTransactionMutation.mutate({ path: { transaction_id: transaction.id } })
  }

  function handleCancelOpenChange(open: boolean) {
    if (!open && !cancellingReference.current && !cancelTransactionMutation.isPending) {
      setTransaction(null)
    }
  }

  return {
    state: {
      studentId: student.id,
      studentName: student.name,
      groupId: params.groupId,
      transaction,
    },
    mutations: { cancelTransactionMutation },
    functions: { handleCancel, handleConfirmCancel, handleCancelOpenChange },
  }
}
