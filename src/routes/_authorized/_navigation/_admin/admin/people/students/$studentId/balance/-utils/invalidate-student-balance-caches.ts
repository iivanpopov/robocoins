import type { QueryClient } from '@tanstack/react-query'

import { getAllStudentsStudentGetQueryKey } from '#/api/hooks/useGetAllStudentsStudentGet'
import { getBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGetQueryKey } from '#/api/hooks/useGetBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGet'
import { getBalanceLeaderboardStudentLeaderboardBalanceGetQueryKey } from '#/api/hooks/useGetBalanceLeaderboardStudentLeaderboardBalanceGet'
import { getStudentBalanceByIdStudentStudentIdBalanceGetQueryKey } from '#/api/hooks/useGetStudentBalanceByIdStudentStudentIdBalanceGet'
import { getStudentByIdStudentStudentIdGetQueryKey } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'

export function invalidateStudentBalanceCaches(queryClient: QueryClient, studentId: number) {
  const path = { student_id: studentId }

  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: getStudentBalanceByIdStudentStudentIdBalanceGetQueryKey({ path }),
    }),
    queryClient.invalidateQueries({
      queryKey: getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey({ path }),
    }),
    queryClient.invalidateQueries({
      queryKey: getBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGetQueryKey({ path }),
    }),
    queryClient.invalidateQueries({
      queryKey: getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({ path }),
    }),
    queryClient.invalidateQueries({
      queryKey: getStudentByIdStudentStudentIdGetQueryKey({ path }),
    }),
    queryClient.invalidateQueries({ queryKey: getAllStudentsStudentGetQueryKey() }),
    queryClient.invalidateQueries({
      queryKey: getBalanceLeaderboardStudentLeaderboardBalanceGetQueryKey(),
    }),
  ])
}
