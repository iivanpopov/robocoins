import { useTranslate } from '@kanjou/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouteContext } from '@tanstack/react-router'

import { useGetStudentRewardProgressStudentStudentIdRewardProgressGet } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import { useGetStudentTransactionHistoryStudentStudentIdTransactionsGet } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { StudentProfileResponse } from '#/api/types'
import { compareTransactionsByNewest } from '#/routes/-utils'

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

  const queryClient = useQueryClient()
  const profile = context.user as StudentProfileResponse
  const historyQuery = useGetStudentTransactionHistoryStudentStudentIdTransactionsGet({
    path: { student_id: profile.id },
    query: { limit: 3 },
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
  const goalProgress = useGoalProgress(profile.id, goal ? goalQuery.data : undefined)

  function formatHistoryDate(value: string) {
    const date = new Date(value)

    const dateKey = date.toISOString().slice(0, 10)

    if (dateKey === dateToday) return t('profile.history.today')
    if (dateKey === dateYesterday) return t('profile.history.yesterday')
    return t('profile.history.date', { date: new Date(dateKey) })
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
    void navigate({ to: '/history', viewTransition: { types: ['slide-forward'] } })
  }

  const dateToday = new Date(context.renderedAt).toISOString().slice(0, 10)
  const dateYesterday = new Date(context.renderedAt - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  const transactions = (historyQuery.data?.transactions ?? [])
    .toSorted(compareTransactionsByNewest)
    .map((transaction) => ({
      id: transaction.id,
      createdAt: transaction.created_at,
      isDeposit: transaction.operation === 'deposit',
      isNew: Date.parse(transaction.created_at) > context.lastLogOn - 5 * 60 * 1000,
      signedAmount: getSignedAmount(transaction),
      reason: transaction.reason,
    }))

  const groups = Object.entries(
    Object.groupBy(transactions, (transaction) => formatHistoryDate(transaction.createdAt)),
  ).map(([date, transactions]) => ({
    date,
    transactions: transactions ?? [],
    total: t('profile.history.amount', {
      count: (transactions ?? []).reduce(
        (total, transaction) => total + transaction.signedAmount,
        0,
      ),
    }),
  }))

  const goalCompleted = Boolean(goal && (goalQuery.data?.coins_remaining ?? 0) <= 0)

  return {
    state: {
      profile,
      groups,
      goal,
      goalCompleted,
      isGoalPending,
      isGoalError,
      isGoalFetching: goalQuery.isFetching || categoriesQuery.isFetching,
      goalProgress: goalProgress.displayWidth,
      goalProgressValue: goalProgress.currentProgress,
      remainingBalance: Math.max(0, goalQuery.data?.coins_remaining ?? 0),
    },
    queries: { history: historyQuery },
    functions: { handleRetryHistory, handleNavigateToShop, handleRetryGoal, handleViewHistory },
  }
}
