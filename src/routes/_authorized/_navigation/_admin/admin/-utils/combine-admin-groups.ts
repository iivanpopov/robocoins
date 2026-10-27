import type { CourseCategoryKey, CourseResponse } from '#/api/types'

export interface AdminGroupRecord {
  id: number
  name: string
  courseId: number
  courseName: string
  category: CourseCategoryKey
  studentsCount: number
}

export function combineAdminGroups(courses: CourseResponse[] | undefined) {
  if (!courses) return []

  return courses.flatMap((course) =>
    (course.groups ?? []).map(
      (group) =>
        ({
          id: group.id,
          name: group.name,
          courseId: course.id,
          courseName: course.name,
          category: course.category,
          studentsCount: group.students_count ?? 0,
        }) satisfies AdminGroupRecord,
    ),
  )
}
