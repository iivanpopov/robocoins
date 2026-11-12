import { useGetAchievementsAchievementsGet } from '#/api/hooks/useGetAchievementsAchievementsGet'
import { sortAchievementsByThreshold } from '#/routes/_authorized/-utils'

import { getAchievementRequestErrorKey } from '../-utils'

export function useAdminAchievementsPage() {
  const achievementsQuery = useGetAchievementsAchievementsGet({ query: { retry: false } })

  function handleRetry() {
    void achievementsQuery.refetch()
  }

  const achievements = sortAchievementsByThreshold(achievementsQuery.data ?? [])
  const errorKey = achievementsQuery.isError
    ? getAchievementRequestErrorKey(achievementsQuery.error, 'admin.achievements.error.load')
    : null

  return {
    state: {
      achievements,
      isPending: achievementsQuery.isPending,
      isError: achievementsQuery.isError,
      isFetching: achievementsQuery.isFetching,
      errorKey,
    },
    queries: { achievements: achievementsQuery },
    functions: { handleRetry },
  }
}
