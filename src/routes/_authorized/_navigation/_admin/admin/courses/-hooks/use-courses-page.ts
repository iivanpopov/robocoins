import { useState } from 'react'

import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'

import { CourseCategoryFilter } from '../-constants'
import type { CourseErrorKey } from '../-types'
import { countCoursesByCategory, filterCourses, getCourseErrorKey } from '../-utils'

export function useCoursesPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CourseCategoryFilter>(CourseCategoryFilter.All)

  const coursesQuery = useGetCoursesCourseGet()

  function handleQueryChange(value: string) {
    setQuery(value)
  }

  function handleCategorySelect(nextCategory: CourseCategoryFilter) {
    setCategory(nextCategory)
  }

  function handleRetry() {
    if (coursesQuery.isFetching) return
    void coursesQuery.refetch()
  }

  const courses = coursesQuery.data ?? []
  const categoryCounts = countCoursesByCategory(courses)
  const filteredCourses = filterCourses(courses, { query, category })

  let errorKey: CourseErrorKey | null = null
  if (coursesQuery.isError) {
    errorKey = getCourseErrorKey(coursesQuery.error, 'admin.courses.error')
  }

  return {
    state: {
      query,
      category,
      courses: filteredCourses,
      categoryCounts,
      totalCount: courses.length,
      errorKey,
      isPending: coursesQuery.isPending,
      isError: coursesQuery.isError,
      isFetching: coursesQuery.isFetching,
    },
    queries: { courses: coursesQuery },
    functions: {
      handleQueryChange,
      handleCategorySelect,
      handleRetry,
    },
  }
}
