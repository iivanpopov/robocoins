import { useNavigate, useParams, useRouteContext, useSearch } from '@tanstack/react-router'

import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { useGetStudentByIdStudentStudentIdGet } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { useGetTeacherGroupsTeacherGroupsGet } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import { AVATARS } from '#/routes/-constants'
import { parseGroupSchedule } from '#/routes/-utils'
import type { GroupCardData } from '#/routes/_authorized/-components/group-card'

export function useStudentProfilePage() {
  const navigate = useNavigate()
  const params = useParams({ from: '/_authorized/student/$studentId/' })
  const search = useSearch({ from: '/_authorized/student/$studentId/' })
  const context = useRouteContext({ from: '/_authorized' })

  const isTeacher = context.user?.role !== 'student'
  const studentId = params.studentId
  const fromGroupId = search.fromGroupId ?? null

  const studentQuery = useGetStudentByIdStudentStudentIdGet({
    path: { student_id: studentId },
  })
  const coursesQuery = useGetCoursesCourseGet({
    query: { enabled: isTeacher },
  })
  const teacherGroupsQuery = useGetTeacherGroupsTeacherGroupsGet({
    query: { enabled: isTeacher },
  })

  function handleBack() {
    if (!isTeacher) {
      void navigate({ to: '/' })
      return
    }
    if (fromGroupId) {
      void navigate({ to: '/group/$groupId', params: { groupId: String(fromGroupId) } })
      return
    }
    void navigate({ to: '/group' })
  }

  function handleEdit() {
    void navigate({
      to: '/student/$studentId/edit',
      params: { studentId: studentId },
      search: { fromGroupId: fromGroupId ?? undefined },
    })
  }

  function handleRetry() {
    if (studentQuery.isError && !studentQuery.isFetching) void studentQuery.refetch()
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()
    if (teacherGroupsQuery.isError && !teacherGroupsQuery.isFetching)
      void teacherGroupsQuery.refetch()
  }

  const profile = studentQuery.data ?? null
  const avatar = AVATARS.find((candidate) => candidate === profile?.avatar) ?? AVATARS[0]
  const groupCards = isTeacher
    ? (profile?.group_ids ?? []).flatMap((groupId) => {
        const group = teacherGroupsQuery.data?.find((candidate) => candidate.id === groupId)
        const course = coursesQuery.data?.find((candidate) => candidate.id === group?.course_id)
        if (!group || !course) return []
        return [
          {
            id: group.id,
            name: group.name,
            courseName: course.name,
            category: course.category,
            schedule: parseGroupSchedule(group.name),
            studentsCount: group.students_count ?? 0,
          } satisfies GroupCardData,
        ]
      })
    : []

  return {
    state: {
      isTeacher,
      studentId,
      fromGroupId,
      profile,
      avatar,
      groupCards,
    },
    queries: { student: studentQuery, courses: coursesQuery, teacherGroups: teacherGroupsQuery },
    functions: { handleBack, handleEdit, handleRetry },
  }
}
