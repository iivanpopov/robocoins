import { useRouteContext } from '@tanstack/react-router'

import { useGetStudentAchievementProgressStudentStudentIdAchievementsGet } from '#/api/hooks/useGetStudentAchievementProgressStudentStudentIdAchievementsGet'
import { sortAchievementsByThreshold } from '#/routes/_authorized/-utils'

export function useAchievementsPage() {
  const context = useRouteContext({ from: '/_authorized/_navigation/_student/achievements/' })

  const achievementsQuery = useGetStudentAchievementProgressStudentStudentIdAchievementsGet(
    { path: { student_id: context.user!.id } },
    { query: { retry: false } },
  )

  function handleRetry() {
    void achievementsQuery.refetch()
  }

  const achievements = sortAchievementsByThreshold(achievementsQuery.data?.achievements ?? [])
  const earnedCount = achievements.filter((achievement) => achievement.earned).length

  return {
    state: {
      achievements,
      earnedCount,
      totalCount: achievements.length,
      isPending: achievementsQuery.isPending,
      isError: achievementsQuery.isError,
      isFetching: achievementsQuery.isFetching,
    },
    queries: { achievements: achievementsQuery },
    functions: { handleRetry },
  }
}
