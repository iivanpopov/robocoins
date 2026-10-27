import { useQueries } from '@tanstack/react-query'

import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { getGroupsByCourseIdGroupCourseCourseIdGetQueryOptions } from '#/api/hooks/useGetGroupsByCourseIdGroupCourseCourseIdGet'
import { parseGroupSchedule } from '#/routes/-utils'
import type { GroupCardData } from '#/routes/_authorized/-components/group-card'

export function useAdminGroupsPage() {
  const coursesQuery = useGetCoursesCourseGet()

  const groupsQueries = useQueries({
    queries: (coursesQuery.data ?? []).map((course) =>
      getGroupsByCourseIdGroupCourseCourseIdGetQueryOptions({ path: { course_id: course.id } }),
    ),
  })

  function handleRetry() {
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()

    groupsQueries.forEach((query) => {
      if (query.isError && !query.isFetching) void query.refetch()
    })
  }

  const groups = groupsQueries.flatMap((query, index) => {
    const course = coursesQuery.data?.[index]
    if (!course) return []

    return (query.data ?? []).map(
      (group) =>
        ({
          id: group.id,
          name: group.name,
          courseName: course.name,
          category: course.category,
          schedule: parseGroupSchedule(group.name),
          studentsCount: group.students_count ?? 0,
        }) satisfies GroupCardData,
    )
  })

  const isGroupsPending = groupsQueries.some((query) => query.isPending)
  const isGroupsError = groupsQueries.some((query) => query.isError)
  const isGroupsFetching = groupsQueries.some((query) => query.isFetching)

  return {
    state: {
      groups,
      isPending: coursesQuery.isPending || isGroupsPending,
      isError: coursesQuery.isError || isGroupsError,
      isRetrying: coursesQuery.isFetching || isGroupsFetching,
    },
    queries: { courses: coursesQuery, groups: groupsQueries },
    functions: { handleRetry },
  }
}
