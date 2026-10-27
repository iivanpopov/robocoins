import type { CourseCategoryKey, CourseResponse } from '#/api/types'

import { COURSE_CATEGORIES } from '../-constants'

export interface CourseCategorySummary {
  category: CourseCategoryKey
  courses: CourseResponse[]
  groupsCount: number
}

export function summarizeCategories(courses: CourseResponse[]) {
  return COURSE_CATEGORIES.map((category) => {
    const categoryCourses = courses.filter((course) => course.category === category)

    return {
      category,
      courses: categoryCourses,
      groupsCount: categoryCourses.reduce(
        (total, course) => total + (course.groups_count ?? course.groups?.length ?? 0),
        0,
      ),
    } satisfies CourseCategorySummary
  })
}
