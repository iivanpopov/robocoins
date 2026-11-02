import { useQuery } from '@tanstack/react-query'

import { getStudentTransactionHistoryStudentStudentIdTransactionsGet } from '#/api/clients/getStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import type { BalanceTransactionResponse } from '#/api/types'

import { getLessonRewards } from '../../../-utils'

const RECENT_REWARD_IN_MILLISECONDS = 60_000
const WARM_REWARD_IN_MILLISECONDS = 2 * 60_000
const EARLIER_REWARD_IN_MILLISECONDS = 5 * 60_000
const REWARD_WINDOW_IN_MILLISECONDS = 110 * 60_000
const REFRESH_IN_MILLISECONDS = 60_000
const PAGE_SIZE = 100

interface UseLessonRewardsProps {
  studentId: number
  now: number
}

export function useLessonRewards(props: UseLessonRewardsProps) {
  const reasonsQuery = useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet()
  const transactionsQuery = useQuery({
    queryKey: [
      ...getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
        path: { student_id: props.studentId },
      }),
      { rewardHistory: true },
    ],
    queryFn: async ({ signal }) => {
      const transactions: BalanceTransactionResponse[] = []
      let offset = 0

      while (true) {
        const history = await getStudentTransactionHistoryStudentStudentIdTransactionsGet({
          path: { student_id: props.studentId },
          query: { limit: PAGE_SIZE, offset },
          signal,
        }).unwrap()
        transactions.push(...history.transactions)
        if (history.transactions.length < PAGE_SIZE) break
        offset += PAGE_SIZE
      }

      return transactions
    },
    staleTime: REFRESH_IN_MILLISECONDS,
    refetchInterval: REFRESH_IN_MILLISECONDS,
    refetchIntervalInBackground: false,
  })

  const reasons = (reasonsQuery.data?.reasons ?? [])
    .filter((reason) => reason.type === 'reward')
    .map((reason) => reason.reason)
  const now = Math.max(props.now, transactionsQuery.dataUpdatedAt)
  const rewards = getLessonRewards(
    transactionsQuery.data ?? [],
    reasons,
    now - REWARD_WINDOW_IN_MILLISECONDS,
    now,
  ).map((reward) => {
    const elapsed = now - reward.latest
    let recency: 'recent' | 'warm' | 'earlier' | 'older' = 'older'
    if (elapsed < RECENT_REWARD_IN_MILLISECONDS) recency = 'recent'
    else if (elapsed < WARM_REWARD_IN_MILLISECONDS) recency = 'warm'
    else if (elapsed < EARLIER_REWARD_IN_MILLISECONDS) recency = 'earlier'

    return { ...reward, recency }
  })

  return { rewards, isError: transactionsQuery.isError || reasonsQuery.isError }
}
