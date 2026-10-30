import { UKRAINIAN_LOCALE } from '#/routes/-constants'

import type { StudentGroup } from './combine-course-groups'

export function getStudentCourseNames(
  courseNames: string[],
  groupIds: number[],
  groups: StudentGroup[],
) {
  const memberCourseNames = groups
    .filter((group) => groupIds.includes(group.id))
    .map((group) => group.courseName)

  return [...new Set([...courseNames, ...memberCourseNames])].toSorted((first, second) =>
    first.localeCompare(second, UKRAINIAN_LOCALE),
  )
}
