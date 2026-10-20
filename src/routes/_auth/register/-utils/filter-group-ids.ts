import type { CourseResponse } from '#/api/types'

export function filterGroupIdsByCourses(courses: CourseResponse[], groupIds: number[] | undefined) {
  return groupIds?.filter((groupId) =>
    courses.some((course) => course.groups?.some((group) => group.id === groupId)),
  )
}
