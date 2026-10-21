import { useTranslate } from '@kanjou/react'
import { useRouteContext } from '@tanstack/react-router'

import { useGetStudentTransactionHistoryStudentStudentIdTransactionsGet } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { StudentProfileResponse } from '#/api/types'
import { compareTransactionsByNewest } from '#/routes/-utils'

import { GOAL_BALANCE } from '../-constants'
import { getSignedAmount } from '../-utils'

export function useStudentPage() {
  const context = useRouteContext({ from: '/_authorized/_navigation/_student/' })
  const t = useTranslate()
  const profile = context.user as StudentProfileResponse
  const dateToday = new Date(context.renderedAt).toISOString().slice(0, 10)
  const dateYesterday = new Date(context.renderedAt - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
  const historyQuery = useGetStudentTransactionHistoryStudentStudentIdTransactionsGet({
    path: { student_id: profile.id },
    query: { limit: 3 },
  })

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

  return {
    state: {
      profile,
      groups,
      goalProgress: `${Math.max(0, Math.min(100, (profile.balance / GOAL_BALANCE) * 100))}%`,
      remainingBalance: Math.max(0, GOAL_BALANCE - profile.balance),
    },
    queries: { history: historyQuery },
    functions: { handleRetryHistory },
  }
}
