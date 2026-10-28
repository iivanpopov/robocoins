import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouter, useRouteContext } from '@tanstack/react-router'
import { useRef, useState, type ChangeEvent, type SyntheticEvent } from 'react'

import { useAnswerDailyTaskDailyStudentIdDailyTaskAnswerPost } from '#/api/hooks/useAnswerDailyTaskDailyStudentIdDailyTaskAnswerPost'
import { getCurrentUserAuthMeGetQueryKey } from '#/api/hooks/useGetCurrentUserAuthMeGet'
import {
  getDailyTaskDailyStudentIdDailyTaskGetQueryKey,
  useGetDailyTaskDailyStudentIdDailyTaskGet,
} from '#/api/hooks/useGetDailyTaskDailyStudentIdDailyTaskGet'
import { getStudentBalanceByIdStudentStudentIdBalanceGetQueryKey } from '#/api/hooks/useGetStudentBalanceByIdStudentStudentIdBalanceGet'
import { getStudentByIdStudentStudentIdGetQueryKey } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import {
  getStudentStreakStudentStudentIdStreakGetQueryKey,
  useGetStudentStreakStudentStudentIdStreakGet,
} from '#/api/hooks/useGetStudentStreakStudentStudentIdStreakGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import type { DailyTaskAnswer, DailyTaskResponse, StudentProfileResponse } from '#/api/types'
import { getMissionWeek } from '#/routes/_authorized/-utils'

export function useDailyMissionPage() {
  const context = useRouteContext({ from: '/_authorized/daily-mission/' })
  const navigate = useNavigate()
  const router = useRouter()

  const [selection, setSelection] = useState<{
    taskId: number
    date: string
    value: string
  } | null>(null)
  const submissionLock = useRef(false)

  const queryClient = useQueryClient()
  const profile = context.user as StudentProfileResponse
  const path = { student_id: profile.id }
  const taskQuery = useGetDailyTaskDailyStudentIdDailyTaskGet(
    { path },
    { query: { retry: false, staleTime: 0, refetchOnMount: false } },
  )
  const streakQuery = useGetStudentStreakStudentStudentIdStreakGet(
    { path },
    { query: { retry: false, staleTime: 0, refetchOnMount: false } },
  )
  const answerMutation = useAnswerDailyTaskDailyStudentIdDailyTaskAnswerPost({
    mutation: {
      retry: false,
      onSuccess: async (result) => {
        if (!result.correct) {
          await taskQuery.refetch()
          return
        }
        queryClient.setQueryData<DailyTaskResponse>(
          getDailyTaskDailyStudentIdDailyTaskGetQueryKey({ path }),
          (task) => task && { ...task, completed_at: result.completed_at, reward: result.reward },
        )
        await Promise.all(
          [
            getDailyTaskDailyStudentIdDailyTaskGetQueryKey({ path }),
            getStudentStreakStudentStudentIdStreakGetQueryKey({ path }),
            getStudentBalanceByIdStudentStudentIdBalanceGetQueryKey({ path }),
            getStudentByIdStudentStudentIdGetQueryKey({ path }),
            getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey({ path }),
            getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({ path }),
            getCurrentUserAuthMeGetQueryKey(),
            ['session'],
          ].map((queryKey) => queryClient.invalidateQueries({ queryKey })),
        )
        await router.invalidate()
      },
      onError: async () => {
        await taskQuery.refetch()
      },
      onSettled: () => {
        submissionLock.current = false
      },
    },
  })

  function handleSelectAnswer(value: string) {
    if (answerMutation.isPending || isCompleted || !task) return
    setSelection({ taskId: task.id, date: task.date, value })
    if (!answerMutation.isError) answerMutation.reset()
  }

  function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
    handleSelectAnswer(event.target.value)
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit || submissionLock.current) return
    submissionLock.current = true
    const body: DailyTaskAnswer = { answer: answer.trim() }
    answerMutation.mutate({ path, body })
  }

  function handleHome() {
    void navigate({ to: '/' })
  }

  async function handleRetry() {
    const result = await taskQuery.refetch()
    if (result.isSuccess) answerMutation.reset()
  }

  function handleRetryStreak() {
    void streakQuery.refetch()
  }

  const task = taskQuery.data
  const answer =
    selection?.taskId === task?.id && selection?.date === task?.date ? (selection?.value ?? '') : ''
  const isCompleted = Boolean(task?.completed_at || answerMutation.data?.correct)
  const options = task?.options ?? []
  const isSupported =
    task?.type === 'text' ||
    ((task?.type === 'multiple_choice' || task?.type === 'true_false') && Boolean(options.length))
  const canSubmit = Boolean(
    task &&
    isSupported &&
    !isCompleted &&
    !taskQuery.isFetching &&
    !taskQuery.isError &&
    !answerMutation.isPending &&
    !answerMutation.isError &&
    answer.trim() &&
    answer.trim().length <= 200,
  )
  const reward = answerMutation.data?.correct ? answerMutation.data.reward : task?.reward
  const week = getMissionWeek(task, !streakQuery.isError ? streakQuery.data : undefined)

  return {
    state: { task, answer, options, isCompleted, isSupported, canSubmit, reward, week },
    queries: { task: taskQuery, streak: streakQuery },
    mutations: { answer: answerMutation },
    functions: {
      handleSelectAnswer,
      handleTextChange,
      handleSubmit,
      handleHome,
      handleRetry,
      handleRetryStreak,
    },
  }
}
