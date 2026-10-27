import { useForm, useSelector } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useEndStudentStreakStudentStudentIdStreakEndPost } from '#/api/hooks/useEndStudentStreakStudentStudentIdStreakEndPost'
import {
  getStudentLongestStreakStudentStudentIdLongestStreakGetQueryKey,
  useGetStudentLongestStreakStudentStudentIdLongestStreakGet,
} from '#/api/hooks/useGetStudentLongestStreakStudentStudentIdLongestStreakGet'
import {
  getStudentStreakStudentStudentIdStreakGetQueryKey,
  useGetStudentStreakStudentStudentIdStreakGet,
} from '#/api/hooks/useGetStudentStreakStudentStudentIdStreakGet'
import { useStartStudentStreakStudentStudentIdStreakStartPost } from '#/api/hooks/useStartStudentStreakStudentStudentIdStreakStartPost'
import { useUpdateStudentStreakStudentStudentIdStreakPatch } from '#/api/hooks/useUpdateStudentStreakStudentStudentIdStreakPatch'
import type { StreakResponse } from '#/api/types'

import { StreakDaysFormSchema } from '../-schemas'
import type { StreakActionResult } from '../-types'
import { getStreakErrorKey, isMissingStreakResponse, parseStreakDays } from '../-utils'
import { getApiErrorKind } from '../../../-utils'

export function useStudentStreakPage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/streak/',
  })

  const queryClient = useQueryClient()
  const currentQueryKey = getStudentStreakStudentStudentIdStreakGetQueryKey({
    path: { student_id: params.studentId },
  })
  const longestQueryKey = getStudentLongestStreakStudentStudentIdLongestStreakGetQueryKey({
    path: { student_id: params.studentId },
  })

  const [result, setResult] = useState<StreakActionResult | null>(null)
  const [isEndOpen, setIsEndOpen] = useState(false)
  const syncedStreakIdReference = useRef<number | null>(null)

  const currentQuery = useGetStudentStreakStudentStudentIdStreakGet(
    { path: { student_id: params.studentId } },
    { query: { retry: false } },
  )
  const longestQuery = useGetStudentLongestStreakStudentStudentIdLongestStreakGet(
    { path: { student_id: params.studentId } },
    { query: { retry: false } },
  )

  const startMutation = useStartStudentStreakStudentStudentIdStreakStartPost({
    mutation: {
      retry: false,
      onSuccess: async (streak) => {
        queryClient.setQueryData<StreakResponse>(currentQueryKey, streak)
        setResult('started')
        await queryClient.invalidateQueries({ queryKey: longestQueryKey }).catch(() => undefined)
      },
    },
  })
  const endMutation = useEndStudentStreakStudentStudentIdStreakEndPost({
    mutation: {
      retry: false,
      onSuccess: async (streak) => {
        queryClient.setQueryData<StreakResponse>(currentQueryKey, streak)
        setResult('ended')
        await queryClient.invalidateQueries({ queryKey: longestQueryKey }).catch(() => undefined)
      },
    },
  })
  const updateMutation = useUpdateStudentStreakStudentStudentIdStreakPatch({
    mutation: {
      retry: false,
      onSuccess: async (streak) => {
        queryClient.setQueryData<StreakResponse>(currentQueryKey, streak)
        setResult('updated')
        await queryClient.invalidateQueries({ queryKey: longestQueryKey }).catch(() => undefined)
      },
    },
  })

  const form = useForm({
    defaultValues: {
      days: '',
    },
    validators: { onChange: StreakDaysFormSchema },
    listeners: {
      onChange: () => {
        if (updateMutation.isError) updateMutation.reset()
      },
    },
    onSubmit: async ({ value }) => {
      if (updateMutation.isPending || !isActive) return

      const days = parseStreakDays(value.days)
      if (days === null) return

      try {
        await updateMutation.mutateAsync({
          path: { student_id: params.studentId },
          body: { days },
        })
      } catch {
        return
      }
    },
  })

  const isFormSubmitting = useSelector(form.store, (state) => state.isSubmitting)

  useEffect(() => {
    const streak = currentQuery.data
    if (!streak || isMissingStreakResponse(currentQuery.error)) {
      syncedStreakIdReference.current = null
      form.reset({ days: '' })
      return
    }
    if (syncedStreakIdReference.current === streak.id) return
    syncedStreakIdReference.current = streak.id
    form.reset({ days: String(streak.days) })
  }, [currentQuery.data, currentQuery.error, form])

  function handleStart() {
    if (startMutation.isPending || endMutation.isPending || updateMutation.isPending) return
    if (isActive) return

    setResult(null)
    startMutation.mutate({ path: { student_id: params.studentId } })
  }

  function handleEndOpenChange(isOpen: boolean) {
    setIsEndOpen(isOpen)
  }

  function handleOpenEnd() {
    if (!isActive || startMutation.isPending || endMutation.isPending) return
    if (updateMutation.isPending) return

    setResult(null)
    setIsEndOpen(true)
  }

  function handleConfirmEnd() {
    setIsEndOpen(false)
    if (!isActive || startMutation.isPending || endMutation.isPending) return
    if (updateMutation.isPending) return

    setResult(null)
    endMutation.mutate({ path: { student_id: params.studentId } })
  }

  function handleUpdateSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isActive || updateMutation.isPending || isFormSubmitting) return
    setResult(null)
    void form.handleSubmit()
  }

  function handleRetry() {
    if (isCurrentError && !currentQuery.isFetching) void currentQuery.refetch()
    if (longestQuery.isError && !longestQuery.isFetching) void longestQuery.refetch()
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  const isCurrentMissing =
    isMissingStreakResponse(currentQuery.error) || (currentQuery.isSuccess && !currentQuery.data)
  const currentStreak = isCurrentMissing ? null : (currentQuery.data ?? null)
  const isCurrentError = currentQuery.isError && !isCurrentMissing
  const readError = isCurrentError ? currentQuery.error : longestQuery.error
  const isActive = !!currentStreak && !currentStreak.end_date
  const isBusy = startMutation.isPending || endMutation.isPending || updateMutation.isPending
  const actionError = startMutation.error ?? endMutation.error ?? updateMutation.error

  return {
    state: {
      studentId: params.studentId,
      currentStreak,
      longestDays: longestQuery.data?.days ?? 0,
      isActive,
      isCurrentMissing,
      result,
      isEndOpen,
      isPending: currentQuery.isPending || longestQuery.isPending,
      isError: !!readError,
      isFetching: currentQuery.isFetching || longestQuery.isFetching,
      isBusy,
      isFormSubmitting,
      errorKind: getApiErrorKind(readError),
      errorKey: readError ? getStreakErrorKey(readError, 'admin.streak.error.load') : null,
      actionErrorKind: getApiErrorKind(actionError),
      actionErrorKey: actionError
        ? getStreakErrorKey(actionError, 'admin.streak.error.action')
        : null,
    },
    queries: {
      current: currentQuery,
      longest: longestQuery,
    },
    mutations: {
      start: startMutation,
      end: endMutation,
      update: updateMutation,
    },
    functions: {
      handleStart,
      handleEndOpenChange,
      handleOpenEnd,
      handleConfirmEnd,
      handleUpdateSubmit,
      handleRetry,
      handleLogin,
    },
    features: { form },
  }
}
