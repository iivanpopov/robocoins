import { useTranslate } from '@kanjou/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import { useCancelStudentTransactionStudentTransactionsTransactionIdCancelPost } from '#/api/hooks/useCancelStudentTransactionStudentTransactionsTransactionIdCancelPost'
import { getGroupByIdGroupIdGroupIdGetQueryKey } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { useGetStudentTransactionHistoryStudentStudentIdTransactionsGet } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { BalanceHistoryResponse, BalanceTransactionResponse, GroupResponse } from '#/api/types'
import { toast } from '#/components/ui'
import { compareTransactionsByNewest } from '#/routes/-utils'

interface UseRecentTransactionsProps {
  studentId: number
  groupId: number
  enabled: boolean
}

export function useRecentTransactions(props: UseRecentTransactionsProps) {
  const t = useTranslate()
  const queryClient = useQueryClient()

  const cancellingReference = useRef(false)
  const cancelButtonReference = useRef<HTMLButtonElement>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<BalanceTransactionResponse | null>(
    null,
  )
  const [exitingTransactionId, setExitingTransactionId] = useState<number | null>(null)

  const transactionsQuery = useGetStudentTransactionHistoryStudentStudentIdTransactionsGet(
    { path: { student_id: props.studentId } },
    { query: { enabled: props.enabled } },
  )
  const cancelTransactionMutation =
    useCancelStudentTransactionStudentTransactionsTransactionIdCancelPost<{
      history: BalanceHistoryResponse | undefined
      group: GroupResponse | undefined
    }>({
      mutation: {
        onMutate: async (variables) => {
          const historyQueryKey =
            getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
              path: { student_id: props.studentId },
            })
          const groupQueryKey = getGroupByIdGroupIdGroupIdGetQueryKey({
            path: { group_id: props.groupId },
          })

          await Promise.all([
            queryClient.cancelQueries({ queryKey: historyQueryKey }),
            queryClient.cancelQueries({ queryKey: groupQueryKey }),
          ])

          const history = queryClient.getQueryData<BalanceHistoryResponse>(historyQueryKey)
          const group = queryClient.getQueryData<GroupResponse>(groupQueryKey)
          const cancelledTransaction = history?.transactions.find(
            (transaction) => transaction.id === variables.path.transaction_id,
          )

          setExitingTransactionId(variables.path.transaction_id)

          if (history && cancelledTransaction && !cancelledTransaction.cancelled_at) {
            queryClient.setQueryData(historyQueryKey, {
              ...history,
              transactions: history.transactions.map((transaction) => {
                if (transaction.id === cancelledTransaction.id) {
                  return { ...transaction, cancelled_at: new Date().toISOString() }
                }
                return transaction
              }),
            })

            if (group) {
              let balanceChange = cancelledTransaction.amount
              if (cancelledTransaction.operation === 'deposit') balanceChange = -balanceChange

              queryClient.setQueryData(groupQueryKey, {
                ...group,
                students: group.students?.map((student) => {
                  if (student.id === props.studentId) {
                    return { ...student, balance: student.balance + balanceChange }
                  }
                  return student
                }),
              })
            }
          }

          return { history, group }
        },
        onError: (_error, _variables, context) => {
          toast.add({ title: t('award.cancel.error'), type: 'error' })
          setExitingTransactionId(null)

          if (context?.history) {
            queryClient.setQueryData(
              getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
                path: { student_id: props.studentId },
              }),
              context.history,
            )
          }
          if (context?.group) {
            queryClient.setQueryData(
              getGroupByIdGroupIdGroupIdGetQueryKey({
                path: { group_id: props.groupId },
              }),
              context.group,
            )
          }
        },
        onSuccess: async (data) => {
          queryClient.setQueryData(
            getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
              path: { student_id: props.studentId },
            }),
            (history: typeof transactionsQuery.data) => {
              if (!history) return history

              return {
                ...history,
                transactions: history.transactions.map((transaction) => {
                  if (transaction.id === data.transaction.id) return data.transaction
                  return transaction
                }),
              }
            },
          )
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: getGroupByIdGroupIdGroupIdGetQueryKey({
                path: { group_id: props.groupId },
              }),
            }),
            queryClient.invalidateQueries({
              queryKey: getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
                path: { student_id: props.studentId },
              }),
            }),
          ])
        },
        onSettled: () => {
          cancellingReference.current = false
          setSelectedTransaction(null)
        },
      },
    })

  function handleDialogOpenChange(open: boolean) {
    if (!open && !cancellingReference.current) setSelectedTransaction(null)
  }

  function handleCancel(transactionId: number) {
    if (
      !props.enabled ||
      cancellingReference.current ||
      selectedTransaction ||
      cancelTransactionMutation.isPending ||
      exitingTransactionId !== null
    )
      return

    const transaction = transactionsQuery.data?.transactions.find(
      (transaction) => transaction.id === transactionId && !transaction.cancelled_at,
    )
    if (transaction) setSelectedTransaction(transaction)
  }

  function handleConfirmCancel() {
    if (
      !props.enabled ||
      !selectedTransaction ||
      cancellingReference.current ||
      cancelTransactionMutation.isPending
    )
      return

    const transaction = transactionsQuery.data?.transactions.find(
      (transaction) => transaction.id === selectedTransaction.id && !transaction.cancelled_at,
    )
    if (!transaction || transaction.student_id !== props.studentId) {
      setSelectedTransaction(null)
      return
    }

    cancellingReference.current = true
    cancelTransactionMutation.mutate({ path: { transaction_id: selectedTransaction.id } })
  }

  function handleExitComplete(transactionId: number) {
    setExitingTransactionId((currentTransactionId) => {
      if (currentTransactionId === transactionId) return null
      return currentTransactionId
    })
  }

  function handleRetry() {
    void transactionsQuery.refetch()
  }

  const transactions = (transactionsQuery.data?.transactions ?? [])
    .filter((transaction) => !transaction.cancelled_at || transaction.id === exitingTransactionId)
    .toSorted(compareTransactionsByNewest)
    .slice(0, 3)

  return {
    refs: { cancelButton: cancelButtonReference },
    state: { transactions, exitingTransactionId, selectedTransaction },
    queries: { transactionsQuery },
    mutations: { cancelTransactionMutation },
    functions: {
      handleRetry,
      handleCancel,
      handleExitComplete,
      handleDialogOpenChange,
      handleConfirmCancel,
    },
  }
}
