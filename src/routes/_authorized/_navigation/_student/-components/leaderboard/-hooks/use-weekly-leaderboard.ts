import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'

import type { StudentProfileResponse } from '#/api/types'

import { getWeeklyLeaderboardQueryOptions, getWeeklyLeaderboardRankQueryOptions } from '../-utils'

export function useWeeklyLeaderboard(pageSize: number) {
  const context = useRouteContext({ from: '/_authorized' })

  const leaderboardQuery = useInfiniteQuery(getWeeklyLeaderboardQueryOptions(pageSize))
  const rankQuery = useQuery(getWeeklyLeaderboardRankQueryOptions(context.user!.id))

  function handleLoadMore() {
    if (leaderboardQuery.isFetching) return
    void leaderboardQuery.fetchNextPage({ cancelRefetch: false })
  }

  function handleRetry() {
    if (leaderboardQuery.isFetchNextPageError) {
      handleLoadMore()
      return
    }
    void leaderboardQuery.refetch()
  }

  function handleRetryRank() {
    void rankQuery.refetch()
  }

  const profile = context.user as StudentProfileResponse
  const entries = Array.from(
    new Map(
      (leaderboardQuery.data?.pages ?? [])
        .flatMap((page) => page.entries)
        .map((entry) => [entry.student_id, entry]),
    ).values(),
  )
  const ownEntry = rankQuery.data &&
    rankQuery.data.rank > 0 && {
      student_id: profile.id,
      name: profile.name,
      avatar: profile.avatar,
      rank: rankQuery.data.rank,
      balance: rankQuery.data.balance,
      course_names: [],
    }
  const isInPreview = entries.some((entry) => entry.student_id === profile.id)

  return {
    state: { entries, ownEntry, studentId: profile.id, isInPreview },
    queries: { leaderboard: leaderboardQuery, rank: rankQuery },
    functions: { handleLoadMore, handleRetry, handleRetryRank },
  }
}
