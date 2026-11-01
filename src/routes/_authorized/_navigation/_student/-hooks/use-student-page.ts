import { Temporal } from '@js-temporal/polyfill'
import { useTranslate } from '@kanjou/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouteContext } from '@tanstack/react-router'

import { useGetDailyTaskDailyStudentIdDailyTaskGet } from '#/api/hooks/useGetDailyTaskDailyStudentIdDailyTaskGet'
import { useGetStudentRewardProgressStudentStudentIdRewardProgressGet } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import { useGetStudentStreakStudentStudentIdStreakGet } from '#/api/hooks/useGetStudentStreakStudentStudentIdStreakGet'
import { useGetStudentTransactionHistoryStudentStudentIdTransactionsGet } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import type { StudentProfileResponse } from '#/api/types'
import { useCurrentTime } from '#/hooks'
import type { Avatar as AvatarName } from '#/routes/-constants'
import { compareTransactionsByNewest, getKyivDate } from '#/routes/-utils'
import { getStreakDays } from '#/routes/_authorized/-utils'

import {
  GREETING_PAIRS,
  HISTORY_MINIMUM_TRANSACTIONS,
  HISTORY_TRANSACTION_FETCH_LIMIT,
} from '../-constants'
import {
  getSignedAmount,
  getStudentRewardCategoriesQueryOptions,
  isRewardEligible,
} from '../-utils'
import { useGoalProgress } from './use-goal-progress'

export function useStudentPage() {
  const navigate = useNavigate()
  const context = useRouteContext({ from: '/_authorized/_navigation/_student/' })
  const t = useTranslate()
  const now = useCurrentTime(context.renderedAt)

  const queryClient = useQueryClient()
  const profile = context.user as StudentProfileResponse
  const taskQuery = useGetDailyTaskDailyStudentIdDailyTaskGet(
    { path: { student_id: profile.id } },
    { query: { retry: false, staleTime: 0, refetchOnMount: false } },
  )
  const streakQuery = useGetStudentStreakStudentStudentIdStreakGet(
    { path: { student_id: profile.id } },
    { query: { retry: false, staleTime: 0, refetchOnMount: false } },
  )
  const historyQuery = useGetStudentTransactionHistoryStudentStudentIdTransactionsGet({
    path: { student_id: profile.id },
    query: { limit: HISTORY_TRANSACTION_FETCH_LIMIT },
  })
  const goalQuery = useGetStudentRewardProgressStudentStudentIdRewardProgressGet({
    path: { student_id: profile.id },
  })
  const categoriesQuery = useQuery(getStudentRewardCategoriesQueryOptions(queryClient, profile))
  const isGoalPending = goalQuery.isPending || categoriesQuery.isPending
  const isGoalError = goalQuery.isError || categoriesQuery.isError
  const goal =
    !isGoalPending &&
    !isGoalError &&
    goalQuery.data?.reward &&
    isRewardEligible(goalQuery.data.reward, categoriesQuery.data)
      ? goalQuery.data.reward
      : null
  const goalProgress = useGoalProgress(
    profile.id,
    goal ? goalQuery.data : undefined,
    context.goalProgressSnapshot,
  )

  function formatHistoryDate(value: string) {
    const dateKey = getKyivDate(value).toString()

    if (dateKey === dateToday) return t('profile.history.today')
    if (dateKey === dateYesterday) return t('profile.history.yesterday')
    return t('profile.history.day', { date: new Date(dateKey) })
  }

  function handleRetryHistory() {
    void historyQuery.refetch()
  }

  function handleNavigateToShop() {
    void navigate({ to: '/shop', viewTransition: { types: ['slide-forward'] } })
  }

  function handleRetryGoal() {
    void Promise.all([goalQuery.refetch(), categoriesQuery.refetch()])
  }

  function handleViewHistory() {
    void navigate({ to: '/history' })
  }

  function handleOpenProfile() {
    void navigate({
      to: '/student/$studentId',
      params: { studentId: profile.id },
    })
  }

  const currentDate = getKyivDate(now)
  const dateToday = currentDate.toString()
  const dateYesterday = currentDate.subtract({ days: 1 }).toString()
  const allTransactions = (historyQuery.data?.transactions ?? [])
    .toSorted(compareTransactionsByNewest)
    .map((transaction) => ({
      id: transaction.id,
      createdAt: transaction.created_at,
      isDeposit: transaction.operation === 'deposit',
      isNew: Date.parse(transaction.created_at) > context.lastLogOn - 5 * 60 * 1000,
      signedAmount: getSignedAmount(transaction),
      reason: transaction.reason,
    }))
  const recentTransactions = allTransactions.filter((transaction) => {
    const dateKey = getKyivDate(transaction.createdAt).toString()
    return dateKey === dateToday || dateKey === dateYesterday
  })
  const hasFullRecentWindow = recentTransactions.length >= HISTORY_MINIMUM_TRANSACTIONS
  const paddedTransactions = hasFullRecentWindow
    ? []
    : allTransactions
        .filter((transaction) => !recentTransactions.includes(transaction))
        .slice(0, HISTORY_MINIMUM_TRANSACTIONS - recentTransactions.length)
  const transactions = [...recentTransactions, ...paddedTransactions].toSorted(
    (transaction, otherTransaction) =>
      Date.parse(otherTransaction.createdAt) - Date.parse(transaction.createdAt),
  )

  const groups = Object.entries(
    Object.groupBy(transactions, (transaction) => formatHistoryDate(transaction.createdAt)),
  ).map(([date, transactions]) => ({
    date,
    transactions: transactions ?? [],
  }))

  const goalCompleted = Boolean(goal && (goalQuery.data?.coins_remaining ?? 0) <= 0)
  const hasNewReward = allTransactions.some(
    (transaction) => transaction.isNew && transaction.isDeposit,
  )
  const avatar = (profile.avatar as AvatarName | null) ?? null
  const localDayIndex = currentDate.since(Temporal.PlainDate.from('1970-01-01'), {
    largestUnit: 'days',
  }).days
  const greetingPair = GREETING_PAIRS[localDayIndex % GREETING_PAIRS.length] ?? GREETING_PAIRS[0]
  const gradientVariant = (localDayIndex % 4) + 1
  const task = !taskQuery.isError ? taskQuery.data : undefined
  const streak = !streakQuery.isError ? streakQuery.data : undefined
  const streakDays = Math.max(getStreakDays(streak), task?.completed_at ? 1 : 0)
  const hasStreak = Boolean(streak || task?.completed_at)

  return {
    state: {
      profile,
      avatar,
      groups,
      goal,
      goalCompleted,
      hasNewReward,
      isGoalPending,
      isGoalError,
      isGoalFetching: goalQuery.isFetching || categoriesQuery.isFetching,
      goalProgressDisplay: Number.parseFloat(goalProgress.displayWidth),
      remainingBalance: Math.max(0, goalQuery.data?.coins_remaining ?? 0),
      greetingVariant: greetingPair.greeting,
      captionVariant: greetingPair.caption,
      gradientVariant,
      streakDays,
      hasStreak,
    },
    queries: { history: historyQuery },
    functions: {
      handleRetryHistory,
      handleNavigateToShop,
      handleRetryGoal,
      handleViewHistory,
      handleOpenProfile,
    },
  }
}
