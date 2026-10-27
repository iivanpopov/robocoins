import { useParams } from '@tanstack/react-router'

import { useGetGroupsByCourseIdGroupCourseCourseIdGet } from '#/api/hooks/useGetGroupsByCourseIdGroupCourseCourseIdGet'

import type { CourseErrorKey } from '../-types'
import { getCourseErrorKey } from '../-utils'
import { useCourseRecord } from './use-course-record'

export function useCourseDetailsPage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/',
  })

  const courseId = params.courseId
  const courseData = useCourseRecord(courseId)

  const groupsQuery = useGetGroupsByCourseIdGroupCourseCourseIdGet(
    { path: { course_id: courseId } },
    { query: { enabled: !!courseData.course } },
  )

  const groups = groupsQuery.data ?? courseData.course?.groups ?? []
  const groupsCount = groupsQuery.data?.length ?? courseData.course?.groups_count ?? groups.length

  let coursesErrorKey: CourseErrorKey | null = null
  if (courseData.coursesQuery.isError) {
    coursesErrorKey = getCourseErrorKey(courseData.coursesQuery.error, 'admin.courses.error')
  }

  let groupsErrorKey: CourseErrorKey | null = null
  if (groupsQuery.isError) {
    groupsErrorKey = getCourseErrorKey(groupsQuery.error, 'admin.courses.error.groups')
  }

  const isCoursesPending = courseData.coursesQuery.isPending
  const isCoursesError = courseData.coursesQuery.isError
  const isNotFound = courseData.coursesQuery.isSuccess && !courseData.course

  function handleRetryCourses() {
    if (courseData.coursesQuery.isFetching) return
    void courseData.coursesQuery.refetch()
  }

  function handleRetryGroups() {
    if (!courseData.course || groupsQuery.isFetching) return
    void groupsQuery.refetch()
  }

  return {
    state: {
      courseId,
      course: courseData.course,
      groups,
      groupsCount,
      coursesErrorKey,
      groupsErrorKey,
      isCoursesPending,
      isCoursesError,
      isCoursesFetching: courseData.coursesQuery.isFetching,
      isNotFound,
      isGroupsPending: !!courseData.course && groupsQuery.isPending && !groups.length,
      isGroupsError: groupsQuery.isError,
      isGroupsFetching: groupsQuery.isFetching,
    },
    queries: {
      courses: courseData.coursesQuery,
      groups: groupsQuery,
    },
    functions: {
      handleRetryCourses,
      handleRetryGroups,
    },
  }
}
