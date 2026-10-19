import type { CourseCategoryKey, CourseResponse } from '#/api/types'

import type { RegisterDraft } from '../-schemas'

export function getSelectedCoursesOutsideCategory(
  courses: CourseResponse[],
  draft: RegisterDraft,
  category: CourseCategoryKey | undefined,
) {
  return courses.filter(
    (course) =>
      course.category !== category &&
      draft.categories?.includes(course.category) &&
      draft.courseIds?.includes(course.id),
  )
}
