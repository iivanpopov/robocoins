import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'

export function useCourseRecord(courseId: number) {
  const coursesQuery = useGetCoursesCourseGet()
  const course = coursesQuery.data?.find((candidate) => candidate.id === courseId) ?? null

  return { course, coursesQuery }
}
