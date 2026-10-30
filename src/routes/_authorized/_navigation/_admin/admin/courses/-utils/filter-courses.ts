import type { CourseResponse } from '#/api/types'

import { CourseCategoryFilter } from '../-constants'

export interface CourseFilter {
  query: string
  category: CourseCategoryFilter
}

export function filterCourses(courses: CourseResponse[], filter: CourseFilter) {
  const query = filter.query.trim().toLocaleLowerCase('uk')

  return courses
    .filter((course) => {
      if (filter.category !== CourseCategoryFilter.All && course.category !== filter.category) {
        return false
      }

      if (!query) return true

      if (course.name.toLocaleLowerCase('uk').includes(query)) return true

      return (course.groups ?? []).some((group) =>
        group.name.toLocaleLowerCase('uk').includes(query),
      )
    })
    .sort((first, second) => first.name.localeCompare(second.name, 'uk'))
}
