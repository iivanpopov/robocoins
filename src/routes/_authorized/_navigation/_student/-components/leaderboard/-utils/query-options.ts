import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'

import { getBalanceLeaderboardStudentLeaderboardBalanceGet } from '#/api/clients/getBalanceLeaderboardStudentLeaderboardBalanceGet'
import { getBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGetQueryOptions } from '#/api/hooks/useGetBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGet'
import { getBalanceLeaderboardStudentLeaderboardBalanceGetQueryKey } from '#/api/hooks/useGetBalanceLeaderboardStudentLeaderboardBalanceGet'

export function getWeeklyLeaderboardQueryOptions(pageSize: number) {
  return infiniteQueryOptions({
    queryKey: [
      ...getBalanceLeaderboardStudentLeaderboardBalanceGetQueryKey(),
      'weekly',
      'infinite',
      pageSize,
    ],
    initialPageParam: 0,
    staleTime: 30_000,
    queryFn: ({ pageParam, signal }) =>
      getBalanceLeaderboardStudentLeaderboardBalanceGet({
        query: { limit: pageSize, offset: pageParam },
        signal,
        throwOnError: true,
      }).unwrap(),
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.entries.length
      if (!lastPage.entries.length || nextOffset >= lastPage.total) return undefined
      return nextOffset
    },
  })
}

export function getWeeklyLeaderboardRankQueryOptions(studentId: number) {
  return {
    ...getBalanceLeaderboardRankStudentLeaderboardBalanceStudentIdGetQueryOptions({
      path: { student_id: studentId },
    }),
    staleTime: 30_000,
  }
}

export function getWeeklyLeaderboardNeighborQueryOptions(studentId: number, rank: number | null) {
  return queryOptions({
    queryKey: [
      ...getBalanceLeaderboardStudentLeaderboardBalanceGetQueryKey(),
      'neighbor',
      studentId,
      rank,
    ],
    enabled: rank !== null && rank > 3,
    staleTime: 30_000,
    queryFn: ({ signal }) =>
      getBalanceLeaderboardStudentLeaderboardBalanceGet({
        query: { limit: 5, offset: Math.max(0, (rank ?? 1) - 4) },
        signal,
        throwOnError: true,
      }).unwrap(),
  })
}
