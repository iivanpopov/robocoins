import { useIntersectionObserver } from '#/hooks'

import { useWeeklyLeaderboard } from '../../-components/leaderboard'

export function useLeaderboardPage() {
  const { state, queries, functions } = useWeeklyLeaderboard(20)

  const intersection = useIntersectionObserver<HTMLDivElement>({
    enabled:
      queries.leaderboard.hasNextPage &&
      !queries.leaderboard.isFetching &&
      !queries.leaderboard.isError,
    rootMargin: '200px',
    onChange: handleIntersection,
  })

  function handleIntersection(entries: IntersectionObserverEntry[]) {
    if (entries.some((entry) => entry.isIntersecting)) functions.handleLoadMore()
  }

  return { refs: { sentinel: intersection.ref }, state, queries, functions }
}
