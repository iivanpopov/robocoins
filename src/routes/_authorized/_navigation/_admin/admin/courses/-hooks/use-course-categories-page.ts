import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'

import type { CourseErrorKey } from '../-types'
import { getCourseErrorKey, summarizeCategories } from '../-utils'

export function useCourseCategoriesPage() {
  const coursesQuery = useGetCoursesCourseGet()

  const courses = coursesQuery.data ?? []
  const summaries = summarizeCategories(courses)
  const totalGroups = summaries.reduce((total, summary) => total + summary.groupsCount, 0)

  let errorKey: CourseErrorKey | null = null
  if (coursesQuery.isError) {
    errorKey = getCourseErrorKey(coursesQuery.error, 'admin.courses.error')
  }

  function handleRetry() {
    if (coursesQuery.isFetching) return
    void coursesQuery.refetch()
  }

  return {
    state: {
      summaries,
      totalCourses: courses.length,
      totalGroups,
      errorKey,
      isPending: coursesQuery.isPending,
      isError: coursesQuery.isError,
      isFetching: coursesQuery.isFetching,
    },
    queries: { courses: coursesQuery },
    functions: { handleRetry },
  }
}
