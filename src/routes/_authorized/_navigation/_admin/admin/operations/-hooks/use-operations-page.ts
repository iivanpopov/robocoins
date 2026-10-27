import { useTranslate } from '@kanjou/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import { changeStudentBalanceStudentStudentIdBalanceTransactionsPost } from '#/api/clients/changeStudentBalanceStudentStudentIdBalanceTransactionsPost'
import { useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost } from '#/api/hooks/useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost'
import { useGetAllStudentsStudentGet } from '#/api/hooks/useGetAllStudentsStudentGet'
import { useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { getStudentBalanceByIdStudentStudentIdBalanceGetQueryOptions } from '#/api/hooks/useGetStudentBalanceByIdStudentStudentIdBalanceGet'
import type { BalanceChangeReasonsKey } from '#/api/types'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'
import {
  getApiErrorKind,
  getStudentTransactionsQueryOptions,
  invalidateStudentsBalanceCaches,
  runWithTimeout,
} from '#/routes/_authorized/_navigation/_admin/admin/-utils'

import { OperationBatchKind, OperationDirection } from '../-constants'
import type { OperationBatchSnapshot, PendingOperation, StudentOperationResult } from '../-types'
import { getFinancialFailureOutcome } from '../-utils'

export function useOperationsPage() {
  const [query, setQuery] = useState('')
  const [direction, setDirection] = useState<OperationDirection>(OperationDirection.Reward)
  const [selectedReasons, setSelectedReasons] = useState<BalanceChangeReasonsKey[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [pendingOperation, setPendingOperation] = useState<PendingOperation | null>(null)
  const [batchSnapshot, setBatchSnapshot] = useState<OperationBatchSnapshot | null>(null)
  const [results, setResults] = useState<StudentOperationResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [refreshError, setRefreshError] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const isRunningReference = useRef(false)

  const t = useTranslate()
  const queryClient = useQueryClient()

  const studentsQuery = useGetAllStudentsStudentGet()
  const reasonsQuery = useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet()

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
    },
  })

  function handleQueryChange(value: string) {
    setQuery(value)
  }

  function handleDirectionChange(nextDirection: OperationDirection) {
    if (isRunningReference.current || isRunning) return

    setDirection(nextDirection)
    setSelectedReasons([])
    setPendingOperation(null)
  }

  function handleReasonToggle(reason: BalanceChangeReasonsKey) {
    if (isRunningReference.current || isRunning) return

    setSelectedReasons((currentReasons) => {
      if (currentReasons.includes(reason)) {
        return currentReasons.filter((currentReason) => currentReason !== reason)
      }
      return [...currentReasons, reason]
    })
  }

  function handleStudentToggle(studentId: number, isSelected: boolean) {
    if (isRunningReference.current || isRunning) return

    setSelectedIds((currentIds) => {
      if (isSelected) {
        if (currentIds.includes(studentId)) return currentIds
        return [...currentIds, studentId]
      }
      return currentIds.filter((currentId) => currentId !== studentId)
    })
  }

  function handleSelectFiltered() {
    if (isRunningReference.current || isRunning) return

    setSelectedIds((currentIds) => {
      const nextIds = new Set(currentIds)
      filteredStudents.forEach((student) => nextIds.add(student.id))
      return Array.from(nextIds)
    })
  }

  function handleClearSelection() {
    if (isRunningReference.current || isRunning) return
    setSelectedIds([])
  }

  function handleRetryStudents() {
    if (studentsQuery.isFetching) return
    void studentsQuery.refetch()
  }

  function handleRetryReasons() {
    if (reasonsQuery.isFetching) return
    void reasonsQuery.refetch()
  }

  function handleRequestSubmit() {
    if (isRunningReference.current || isRunning || hasUnresolvedUnknown) return

    const studentIds = selectedStudents.map((student) => student.id)
    if (!studentIds.length || !selectedReasons.length) return

    setPendingOperation({
      kind: OperationBatchKind.Initial,
      studentIds,
      direction,
      reasons: [...selectedReasons],
    })
  }

  function handleRequestRetry() {
    if (isRunningReference.current || isRunning || !batchSnapshot) return

    const studentIds = results
      .filter((result) => result.status === 'failure' && result.isRetryable)
      .map((result) => result.studentId)
    if (!studentIds.length) return

    setPendingOperation({
      kind: OperationBatchKind.Retry,
      studentIds,
      direction: batchSnapshot.direction,
      reasons: [...batchSnapshot.reasons],
    })
  }

  function handleConfirmOpenChange(open: boolean) {
    if (open || isRunningReference.current || isRunning) return
    setPendingOperation(null)
  }

  function handleConfirm() {
    if (
      !pendingOperation ||
      !pendingOperation.studentIds.length ||
      isRunningReference.current ||
      isRunning
    ) {
      return
    }

    const operation = pendingOperation
    setPendingOperation(null)
    void runBatch(operation.studentIds, operation.kind, {
      direction: operation.direction,
      reasons: operation.reasons,
    })
  }

  async function handleCheckHistory(studentId: number) {
    const result = results.find((currentResult) => currentResult.studentId === studentId)
    if (!result || result.historyCheck === 'checking' || result.historyCheck === 'checked') return

    updateResult(studentId, { historyCheck: 'checking', historyAcknowledged: false })

    try {
      const [balance] = await Promise.all([
        queryClient.fetchQuery({
          ...getStudentBalanceByIdStudentStudentIdBalanceGetQueryOptions({
            path: { student_id: studentId },
          }),
          staleTime: 0,
        }),
        queryClient.fetchInfiniteQuery({
          ...getStudentTransactionsQueryOptions(studentId),
          staleTime: 0,
        }),
      ])

      updateResult(studentId, {
        historyCheck: 'checked',
        historyAcknowledged: false,
        balance: balance.balance,
      })
    } catch {
      updateResult(studentId, { historyCheck: 'error', historyAcknowledged: false })
    }
  }

  function handleAcknowledgeUnknownResults() {
    setResults((currentResults) =>
      currentResults.map((result) => {
        if (result.status !== 'unknown' || result.historyCheck !== 'checked') return result
        return { ...result, historyAcknowledged: true }
      }),
    )
  }

  async function handleRefreshData() {
    if (isRefreshing) return

    setIsRefreshing(true)
    try {
      const studentIds = results
        .filter((result) => result.status === 'success')
        .map((result) => result.studentId)
      await invalidateStudentsBalanceCaches(queryClient, studentIds, {
        throwOnError: true,
        cancelRefetch: false,
      })
      setRefreshError(false)
    } catch {
      setRefreshError(true)
    } finally {
      setIsRefreshing(false)
    }
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  async function runBatch(
    studentIds: number[],
    kind: PendingOperation['kind'],
    snapshot: OperationBatchSnapshot,
  ) {
    if (
      isRunningReference.current ||
      !studentIds.length ||
      !snapshot.reasons.length ||
      (kind === OperationBatchKind.Initial && hasUnresolvedUnknown)
    ) {
      return
    }

    isRunningReference.current = true
    setIsRunning(true)
    setRefreshError(false)

    const reasons = [...snapshot.reasons]
    const studentNames = new Map(students.map((student) => [student.id, student.name] as const))

    if (kind === OperationBatchKind.Initial) {
      setBatchSnapshot(snapshot)
      setResults(
        studentIds.map((studentId) =>
          createPendingResult(
            studentId,
            studentNames.get(studentId) ??
              t('admin.operations.student-fallback', { id: studentId }),
          ),
        ),
      )
    } else {
      setResults((currentResults) =>
        currentResults.map((result) => {
          if (!studentIds.includes(result.studentId)) return result
          return {
            ...result,
            status: 'pending',
            balance: null,
            transactionAmount: null,
            errorKind: null,
            errorKey: null,
            isRetryable: false,
            historyCheck: 'idle',
            historyAcknowledged: false,
          }
        }),
      )
    }

    const successfulIds: number[] = []

    for (const studentId of studentIds) {
      try {
        const response = await changeBalanceMutation.mutateAsync({
          path: { student_id: studentId },
          body: { reason: reasons },
        })
        successfulIds.push(studentId)
        updateResult(studentId, {
          status: 'success',
          balance: response.balance,
          transactionAmount:
            response.transaction.operation === 'deposit'
              ? response.transaction.amount
              : -response.transaction.amount,
          errorKind: null,
          errorKey: null,
          isRetryable: false,
          historyCheck: 'idle',
          historyAcknowledged: false,
        })
      } catch (error) {
        const outcome = getFinancialFailureOutcome(error)
        updateResult(studentId, {
          status: outcome.isUnknown ? 'unknown' : 'failure',
          balance: null,
          transactionAmount: null,
          errorKind: outcome.errorKind,
          errorKey: outcome.errorKey,
          isRetryable: outcome.isRetryable,
          historyCheck: 'idle',
          historyAcknowledged: false,
        })
      }
    }

    if (kind === OperationBatchKind.Initial) setSelectedIds([])

    isRunningReference.current = false
    setIsRunning(false)

    if (successfulIds.length) {
      try {
        await invalidateStudentsBalanceCaches(queryClient, successfulIds, {
          throwOnError: true,
          cancelRefetch: false,
        })
        setRefreshError(false)
      } catch {
        setRefreshError(true)
      }
    }
  }

  function updateResult(studentId: number, patch: Partial<StudentOperationResult>) {
    setResults((currentResults) =>
      currentResults.map((result) =>
        result.studentId === studentId ? { ...result, ...patch } : result,
      ),
    )
  }

  const students = (studentsQuery.data ?? []).toSorted((first, second) =>
    first.name.localeCompare(second.name, UKRAINIAN_LOCALE),
  )
  const normalizedQuery = query.trim().toLocaleLowerCase(UKRAINIAN_LOCALE)
  const filteredStudents = students.filter((student) => {
    if (!normalizedQuery) return true
    return student.name.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery)
  })
  const selectedStudents = students.filter((student) => selectedIds.includes(student.id))
  const selectedVisibleCount = filteredStudents.filter((student) =>
    selectedIds.includes(student.id),
  ).length
  const reasons = (reasonsQuery.data?.reasons ?? [])
    .filter((reason) => reason.type === direction)
    .map((reason) => reason.reason)
  const successCount = results.filter((result) => result.status === 'success').length
  const failureCount = results.filter((result) => result.status === 'failure').length
  const unknownCount = results.filter((result) => result.status === 'unknown').length
  const retryableCount = results.filter(
    (result) => result.status === 'failure' && result.isRetryable,
  ).length
  const unacknowledgedUnknownResults = results.filter(
    (result) => result.status === 'unknown' && !result.historyAcknowledged,
  )
  const hasUnresolvedUnknown = !!unacknowledgedUnknownResults.length
  const canAcknowledgeUnknown =
    !!unacknowledgedUnknownResults.length &&
    unacknowledgedUnknownResults.every((result) => result.historyCheck === 'checked')
  const pendingCount = results.filter((result) => result.status === 'pending').length
  const studentsErrorKind = studentsQuery.error ? getApiErrorKind(studentsQuery.error) : null
  const reasonsErrorKind = reasonsQuery.error ? getApiErrorKind(reasonsQuery.error) : null

  return {
    state: {
      query,
      direction,
      selectedReasons,
      selectedIds,
      selectedCount: selectedStudents.length,
      selectedVisibleCount,
      filteredStudents,
      students,
      foundCount: filteredStudents.length,
      totalCount: students.length,
      reasons,
      results,
      batchSnapshot,
      pendingOperation,
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
      studentsIsPending: studentsQuery.isPending,
      studentsIsError: studentsQuery.isError,
      studentsErrorKind,
      studentsIsFetching: studentsQuery.isFetching,
      reasonsIsPending: reasonsQuery.isPending,
      reasonsIsError: reasonsQuery.isError,
      reasonsErrorKind,
      reasonsIsFetching: reasonsQuery.isFetching,
    },
    queries: { students: studentsQuery, reasons: reasonsQuery },
    mutations: { changeBalance: changeBalanceMutation },
    functions: {
      handleQueryChange,
      handleDirectionChange,
      handleReasonToggle,
      handleStudentToggle,
      handleSelectFiltered,
      handleClearSelection,
      handleRetryStudents,
      handleRetryReasons,
      handleRequestSubmit,
      handleRequestRetry,
      handleConfirmOpenChange,
      handleConfirm,
      handleCheckHistory,
      handleAcknowledgeUnknownResults,
      handleRefreshData,
      handleLogin,
    },
  }
}

function createPendingResult(studentId: number, studentName: string): StudentOperationResult {
  return {
    studentId,
    studentName,
    status: 'pending',
    balance: null,
    transactionAmount: null,
    errorKind: null,
    errorKey: null,
    isRetryable: false,
    historyCheck: 'idle',
    historyAcknowledged: false,
  }
}
