import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'

import type { CourseErrorKey } from '../-types'
import { getCourseErrorKey, summarizeCategories } from '../-utils'

export function useCourseCategoriesPage() {
  const coursesQuery = useGetCoursesCourseGet()

  function handleRetry() {
    if (coursesQuery.isFetching) return
    void coursesQuery.refetch()
  }

  const courses = coursesQuery.data ?? []
  const summaries = summarizeCategories(courses)

  let errorKey: CourseErrorKey | null = null
  if (coursesQuery.isError) {
    errorKey = getCourseErrorKey(coursesQuery.error, 'courses.error.load')
  }

  return {
    state: {
      summaries,
      errorKey,
      isPending: coursesQuery.isPending,
      isError: coursesQuery.isError,
      isFetching: coursesQuery.isFetching,
    },
    queries: { courses: coursesQuery },
    functions: { handleRetry },
  }
}
