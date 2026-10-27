import type { QueryClient } from '@tanstack/react-query'

import { getAllStudentsStudentGetQueryKey } from '#/api/hooks/useGetAllStudentsStudentGet'
import { getBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGetQueryKey } from '#/api/hooks/useGetBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGet'
import { getBalanceLeaderboardStudentLeaderboardBalanceGetQueryKey } from '#/api/hooks/useGetBalanceLeaderboardStudentLeaderboardBalanceGet'
import { getStudentBalanceByIdStudentStudentIdBalanceGetQueryKey } from '#/api/hooks/useGetStudentBalanceByIdStudentStudentIdBalanceGet'
import { getStudentByIdStudentStudentIdGetQueryKey } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { getTeacherGroupsTeacherGroupsGetQueryKey } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'

interface InvalidateStudentBalanceCachesOptions {
  throwOnError?: boolean
  cancelRefetch?: boolean
}

export function invalidateStudentBalanceCaches(
  queryClient: QueryClient,
  studentId: number,
  options: InvalidateStudentBalanceCachesOptions = {},
) {
  const path = { student_id: studentId }
  const invalidateOptions = {
    throwOnError: options.throwOnError ?? false,
    cancelRefetch: options.cancelRefetch ?? false,
  }

  return Promise.all([
    queryClient.invalidateQueries(
      { queryKey: getStudentBalanceByIdStudentStudentIdBalanceGetQueryKey({ path }) },
      invalidateOptions,
    ),
    queryClient.invalidateQueries(
      { queryKey: getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey({ path }) },
      invalidateOptions,
    ),
    queryClient.invalidateQueries(
      {
        queryKey: getBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGetQueryKey({ path }),
      },
      invalidateOptions,
    ),
    queryClient.invalidateQueries(
      { queryKey: getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({ path }) },
      invalidateOptions,
    ),
    queryClient.invalidateQueries(
      { queryKey: getStudentByIdStudentStudentIdGetQueryKey({ path }) },
      invalidateOptions,
    ),
    queryClient.invalidateQueries(
      { queryKey: getAllStudentsStudentGetQueryKey() },
      invalidateOptions,
    ),
    queryClient.invalidateQueries(
      { queryKey: getBalanceLeaderboardStudentLeaderboardBalanceGetQueryKey() },
      invalidateOptions,
    ),
    queryClient.invalidateQueries(
      { queryKey: getTeacherGroupsTeacherGroupsGetQueryKey() },
      invalidateOptions,
    ),
    queryClient.invalidateQueries(
      { queryKey: [{ url: '/group/id/:group_id' }] },
      invalidateOptions,
    ),
    queryClient.invalidateQueries({ queryKey: [{ url: '/group/name/:name' }] }, invalidateOptions),
    queryClient.invalidateQueries(
      { queryKey: [{ url: '/group/course/:course_id' }] },
      invalidateOptions,
    ),
    queryClient.invalidateQueries(
      { queryKey: [{ url: '/teacher/course/:course_id/groups' }] },
      invalidateOptions,
    ),
  ])
}
