import type { CourseCategoryKey, CourseResponse } from '#/api/types'

import { COURSE_CATEGORIES } from '../-constants'

export function countCoursesByCategory(courses: CourseResponse[]) {
  const counts = Object.fromEntries(COURSE_CATEGORIES.map((category) => [category, 0])) as Record<
    CourseCategoryKey,
    number
  >

  courses.forEach((course) => {
    counts[course.category] += 1
  })

  return counts
}
