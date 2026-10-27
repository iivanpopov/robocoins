import { useNavigate, useParams } from '@tanstack/react-router'

import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { useGetStudentByIdStudentStudentIdGet } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'

import { combineCourseGroups, getApiErrorKind, getStudentCourseNames } from '../../-utils'

export function useStudentProfilePage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/',
  })

  const studentQuery = useGetStudentByIdStudentStudentIdGet({
    path: { student_id: params.studentId },
  })
  const coursesQuery = useGetCoursesCourseGet()

  function handleBack() {
    void navigate({ to: '/admin/people/students' })
  }

  function handleRetry() {
    if (!studentQuery.isFetching) void studentQuery.refetch()
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  const student = studentQuery.data ?? null
  const groups = combineCourseGroups(coursesQuery.data)
  const memberships = student
    ? groups
        .filter((group) => student.group_ids.includes(group.id))
        .toSorted((first, second) =>
          first.courseName.localeCompare(second.courseName, UKRAINIAN_LOCALE),
        )
    : []
  const courseNames = getStudentCourseNames(
    student?.course_names ?? [],
    student?.group_ids ?? [],
    groups,
  )
  const error = studentQuery.error ?? coursesQuery.error ?? null

  return {
    state: {
      student,
      memberships,
      courseNames,
      groupCount: memberships.length,
      courseCount: courseNames.length,
      errorKind: getApiErrorKind(error),
      isPending: studentQuery.isPending || coursesQuery.isPending,
      isError: studentQuery.isError || coursesQuery.isError,
      isRetrying: studentQuery.isFetching || coursesQuery.isFetching,
    },
    queries: { student: studentQuery, courses: coursesQuery },
    functions: { handleBack, handleRetry, handleLogin },
  }
}
