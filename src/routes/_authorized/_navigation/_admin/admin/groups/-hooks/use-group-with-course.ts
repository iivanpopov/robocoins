import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'

import { useGroupRecord } from './use-group-record'

export function useGroupWithCourse(groupId: number) {
  const groupData = useGroupRecord(groupId)
  const coursesQuery = useGetCoursesCourseGet()
  const course = coursesQuery.data?.find((candidate) => candidate.id === groupData.group?.course_id)

  return {
    ...groupData,
    course: course ?? null,
    coursesQuery,
  }
}
