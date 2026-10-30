import { useTranslate } from '@kanjou/react'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { cancelStudentTransactionStudentTransactionsTransactionIdCancelPost } from '#/api/clients/cancelStudentTransactionStudentTransactionsTransactionIdCancelPost'
import { changeStudentBalanceStudentStudentIdBalanceTransactionsPost } from '#/api/clients/changeStudentBalanceStudentStudentIdBalanceTransactionsPost'
import { useCancelStudentTransactionStudentTransactionsTransactionIdCancelPost } from '#/api/hooks/useCancelStudentTransactionStudentTransactionsTransactionIdCancelPost'
import { useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost } from '#/api/hooks/useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost'
import { useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { useGetBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGet } from '#/api/hooks/useGetBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGet'
import { useGetStudentBalanceByIdStudentStudentIdBalanceGet } from '#/api/hooks/useGetStudentBalanceByIdStudentStudentIdBalanceGet'
import { useGetStudentByIdStudentStudentIdGet } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { useGetStudentRewardProgressStudentStudentIdRewardProgressGet } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import type { BalanceChangeReasonsKey, BalanceTransactionResponse } from '#/api/types'
import { toast } from '#/components/ui'
import { compareTransactionsByNewest } from '#/routes/-utils'
import {
  getStudentTransactionsQueryOptions,
  invalidateStudentBalanceCaches,
  isUnknownResultError,
  runWithTimeout,
} from '#/routes/_authorized/_navigation/_admin/admin/-utils'

import { BalanceDirection, BalanceMutationKind } from '../-constants'
import { getApiErrorKind } from '../../../-utils'

export function useStudentBalancePage(studentId: number) {
  const navigate = useNavigate()

  const [direction, setDirection] = useState<BalanceDirection>(BalanceDirection.Reward)
  const [selectedReasons, setSelectedReasons] = useState<BalanceChangeReasonsKey[]>([])
  const [pendingDeductionReasons, setPendingDeductionReasons] = useState<
    BalanceChangeReasonsKey[] | null
  >(null)
  const [pendingCancelTransaction, setPendingCancelTransaction] =
    useState<BalanceTransactionResponse | null>(null)
  const [unknownResult, setUnknownResult] = useState<BalanceMutationKind | null>(null)
  const [isUnknownHistoryChecked, setIsUnknownHistoryChecked] = useState(false)
  const [unknownReadError, setUnknownReadError] = useState(false)
  const [readRefreshError, setReadRefreshError] = useState(false)
  const [isVerifyingUnknown, setIsVerifyingUnknown] = useState(false)
  const [isRefreshingRead, setIsRefreshingRead] = useState(false)
  const submittingReference = useRef(false)
  const cancellingReference = useRef(false)

  const t = useTranslate()
  const queryClient = useQueryClient()

  const studentQuery = useGetStudentByIdStudentStudentIdGet({
    path: { student_id: studentId },
  })
  const balanceQuery = useGetStudentBalanceByIdStudentStudentIdBalanceGet({
    path: { student_id: studentId },
  })
  const rewardProgressQuery = useGetStudentRewardProgressStudentStudentIdRewardProgressGet({
    path: { student_id: studentId },
  })
  const rankQuery = useGetBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGet({
    path: { student_id: studentId },
  })
  const reasonsQuery = useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet()
  const historyQuery = useInfiniteQuery(getStudentTransactionsQueryOptions(studentId))

  const changeBalanceMutation = useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost({
    mutation: {
      retry: false,
      mutationFn: (variables) =>
        runWithTimeout((signal) =>
          changeStudentBalanceStudentStudentIdBalanceTransactionsPost({
            ...variables,
            signal,
          }).unwrap(),
        ),
      onSuccess: () => {
        setSelectedReasons([])
        setPendingDeductionReasons(null)
        setReadRefreshError(false)
        toast.add({ title: t('admin.balance.operation.success'), type: 'success' })
        void refreshBalanceAfterConfirmedResult()
      },
      onError: (error) => {
        if (isUnknownResultError(error)) markUnknownResult(BalanceMutationKind.Change)
      },
      onSettled: () => {
        submittingReference.current = false
        setPendingDeductionReasons(null)
      },
    },
  })
  const cancelTransactionMutation =
    useCancelStudentTransactionStudentTransactionsTransactionIdCancelPost({
      mutation: {
        retry: false,
        mutationFn: (variables) =>
          runWithTimeout((signal) =>
            cancelStudentTransactionStudentTransactionsTransactionIdCancelPost({
              ...variables,
              signal,
            }).unwrap(),
          ),
        onSuccess: () => {
          setPendingCancelTransaction(null)
          setReadRefreshError(false)
          toast.add({ title: t('admin.balance.cancel.success'), type: 'success' })
          void refreshBalanceAfterConfirmedResult()
        },
        onError: (error) => {
          if (isUnknownResultError(error)) markUnknownResult(BalanceMutationKind.Cancel)
        },
        onSettled: () => {
          cancellingReference.current = false
        },
      },
    })

  async function refreshBalanceData() {
    await invalidateStudentBalanceCaches(queryClient, studentId, {
      throwOnError: true,
      cancelRefetch: false,
    })
  }

  async function refreshBalanceAfterConfirmedResult() {
    try {
      await refreshBalanceData()
      setReadRefreshError(false)
    } catch {
      setReadRefreshError(true)
    }
  }

  function markUnknownResult(kind: BalanceMutationKind) {
    setUnknownResult(kind)
    setIsUnknownHistoryChecked(false)
    setUnknownReadError(false)
    setReadRefreshError(false)
    setSelectedReasons([])
    setPendingDeductionReasons(null)
    setPendingCancelTransaction(null)
  }

  function handleBack() {
    void navigate({
      to: '/admin/people/students/$studentId',
      params: { studentId },
    })
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  function handleRetrySummary() {
    if (studentQuery.isError && !studentQuery.isFetching) void studentQuery.refetch()
    if (balanceQuery.isError && !balanceQuery.isFetching) void balanceQuery.refetch()
    if (rewardProgressQuery.isError && !rewardProgressQuery.isFetching)
      void rewardProgressQuery.refetch()
    if (rankQuery.isError && !rankQuery.isFetching) void rankQuery.refetch()
  }

  function handleRetryReasons() {
    if (!reasonsQuery.isFetching) void reasonsQuery.refetch()
  }

  async function handleRefreshReadData() {
    if (isRefreshingRead) return

    setIsRefreshingRead(true)
    try {
      await refreshBalanceData()
      setReadRefreshError(false)
    } catch {
      setReadRefreshError(true)
    } finally {
      setIsRefreshingRead(false)
    }
  }

  function handleDirectionChange(nextDirection: BalanceDirection) {
    if (
      changeBalanceMutation.isPending ||
      submittingReference.current ||
      pendingDeductionReasons ||
      unknownResult
    )
      return

    changeBalanceMutation.reset()
    setDirection(nextDirection)
    setSelectedReasons([])
  }

  function handleReasonToggle(reason: BalanceChangeReasonsKey) {
    if (
      changeBalanceMutation.isPending ||
      submittingReference.current ||
      pendingDeductionReasons ||
      unknownResult
    )
      return

    changeBalanceMutation.reset()
    setSelectedReasons((currentReasons) => {
      if (currentReasons.includes(reason)) {
        return currentReasons.filter((currentReason) => currentReason !== reason)
      }
      return [...currentReasons, reason]
    })
  }

  function submitBalanceChange(reasons: BalanceChangeReasonsKey[]) {
    if (
      !reasons.length ||
      submittingReference.current ||
      changeBalanceMutation.isPending ||
      unknownResult
    )
      return

    submittingReference.current = true
    changeBalanceMutation.mutate({
      path: { student_id: studentId },
      body: { reason: reasons },
    })
  }

  function handleChangeSubmit() {
    if (
      !selectedReasons.length ||
      changeBalanceMutation.isPending ||
      submittingReference.current ||
      pendingDeductionReasons ||
      unknownResult
    )
      return

    if (direction === BalanceDirection.Punish) {
      setPendingDeductionReasons([...selectedReasons])
      return
    }
    submitBalanceChange(selectedReasons)
  }

  function handleDeductionDialogOpenChange(open: boolean) {
    if (open || changeBalanceMutation.isPending || submittingReference.current) return
    setPendingDeductionReasons(null)
  }

  function handleConfirmDeduction() {
    if (!pendingDeductionReasons) return
    submitBalanceChange(pendingDeductionReasons)
  }

  function handleRequestCancel(transaction: BalanceTransactionResponse) {
    if (
      transaction.cancelled_at ||
      transaction.student_id !== studentId ||
      cancelTransactionMutation.isPending ||
      cancellingReference.current ||
      unknownResult
    )
      return

    cancelTransactionMutation.reset()
    setPendingCancelTransaction(transaction)
  }

  function handleCancelDialogOpenChange(open: boolean) {
    if (open || cancelTransactionMutation.isPending || cancellingReference.current) return
    cancelTransactionMutation.reset()
    setPendingCancelTransaction(null)
  }

  function handleConfirmCancel() {
    if (
      !pendingCancelTransaction ||
      pendingCancelTransaction.student_id !== studentId ||
      cancellingReference.current ||
      cancelTransactionMutation.isPending ||
      unknownResult
    )
      return

    const currentTransaction = (historyQuery.data?.pages ?? [])
      .flatMap((page) => page.transactions)
      .find((transaction) => transaction.id === pendingCancelTransaction.id)

    if (currentTransaction?.cancelled_at) {
      setPendingCancelTransaction(null)
      void refreshBalanceAfterConfirmedResult()
      toast.add({ title: t('admin.balance.cancel.already') })
      return
    }

    cancellingReference.current = true
    cancelTransactionMutation.mutate({
      path: { transaction_id: pendingCancelTransaction.id },
    })
  }

  function handleLoadMore() {
    if (historyQuery.isFetching || !historyQuery.hasNextPage) return
    void historyQuery.fetchNextPage({ cancelRefetch: false })
  }

  function handleRetryHistory() {
    if (historyQuery.isFetchNextPageError) {
      handleLoadMore()
      return
    }
    if (!historyQuery.isFetching) void historyQuery.refetch()
  }

  async function handleVerifyUnknownResult() {
    if (isVerifyingUnknown || isUnknownHistoryChecked) return

    setIsVerifyingUnknown(true)
    setUnknownReadError(false)
    try {
      await refreshBalanceData()
      setIsUnknownHistoryChecked(true)
    } catch {
      setIsUnknownHistoryChecked(false)
      setUnknownReadError(true)
    } finally {
      setIsVerifyingUnknown(false)
    }
  }

  function handleAcknowledgeUnknownResult() {
    if (!isUnknownHistoryChecked || !unknownResult) return

    changeBalanceMutation.reset()
    cancelTransactionMutation.reset()
    setUnknownResult(null)
    setIsUnknownHistoryChecked(false)
    setUnknownReadError(false)
  }

  const balance = balanceQuery.data?.balance ?? 0
  const transactions = Array.from(
    new Map(
      (historyQuery.data?.pages ?? [])
        .flatMap((page) => page.transactions)
        .map((transaction) => [transaction.id, transaction]),
    ).values(),
  ).toSorted(compareTransactionsByNewest)
  const reasons = (reasonsQuery.data?.reasons ?? [])
    .filter((reason) => reason.type === direction)
    .map((reason) => reason.reason)
  const rewardProgress = rewardProgressQuery.data ?? null
  const progressPercent =
    rewardProgress?.progress_percent === null || rewardProgress?.progress_percent === undefined
      ? null
      : Math.max(0, Math.min(100, rewardProgress.progress_percent))
  const summaryError = balanceQuery.error ?? rewardProgressQuery.error ?? rankQuery.error ?? null
  const isCancelling = cancelTransactionMutation.isPending

  return {
    state: {
      studentName: studentQuery.data?.name ?? null,
      balance,
      rewardProgress,
      rewardProgressPercent: progressPercent,
      rank: rankQuery.data ?? null,
      summaryIsPending:
        balanceQuery.isPending || rewardProgressQuery.isPending || rankQuery.isPending,
      summaryIsError: balanceQuery.isError || rewardProgressQuery.isError || rankQuery.isError,
      summaryErrorKind: summaryError ? getApiErrorKind(summaryError) : null,
      summaryIsRetrying:
        balanceQuery.isFetching || rewardProgressQuery.isFetching || rankQuery.isFetching,
      transactions,
      direction,
      selectedReasons,
      reasons,
      pendingDeductionReasons,
      pendingCancelTransaction,
      unknownResult,
      isUnknownHistoryChecked,
      unknownReadError,
      readRefreshError,
      isVerifyingUnknown,
      isRefreshingRead,
      isCancelling,
      historyErrorKind: historyQuery.error ? getApiErrorKind(historyQuery.error) : null,
      reasonsErrorKind: reasonsQuery.error ? getApiErrorKind(reasonsQuery.error) : null,
      changeErrorKind: changeBalanceMutation.error
        ? getApiErrorKind(changeBalanceMutation.error)
        : null,
      cancelErrorKind: cancelTransactionMutation.error
        ? getApiErrorKind(cancelTransactionMutation.error)
        : null,
    },
    queries: {
      student: studentQuery,
      balance: balanceQuery,
      rewardProgress: rewardProgressQuery,
      rank: rankQuery,
      reasons: reasonsQuery,
      history: historyQuery,
    },
    mutations: {
      changeBalance: changeBalanceMutation,
      cancelTransaction: cancelTransactionMutation,
    },
    functions: {
      handleBack,
      handleLogin,
      handleRetrySummary,
      handleRetryReasons,
      handleRefreshReadData,
      handleDirectionChange,
      handleReasonToggle,
      handleChangeSubmit,
      handleDeductionDialogOpenChange,
      handleConfirmDeduction,
      handleRequestCancel,
      handleCancelDialogOpenChange,
      handleConfirmCancel,
      handleLoadMore,
      handleRetryHistory,
      handleVerifyUnknownResult,
      handleAcknowledgeUnknownResult,
    },
  }
}
