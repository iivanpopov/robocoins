import { useNavigate, useParams } from '@tanstack/react-router'

import { useGetUsersUsersGet } from '#/api/hooks/useGetUsersUsersGet'

import type { GroupErrorKey } from '../-types'
import { getGroupErrorKey, getGroupErrorStatus } from '../-utils'
import { useGroupWithCourse } from './use-group-with-course'

export function useGroupDetailsPage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/',
  })

  const groupId = params.groupId

  const groupData = useGroupWithCourse(groupId)
  const usersQuery = useGetUsersUsersGet()

  function handleBack() {
    void navigate({ to: '/admin' })
  }

  function handleRetry() {
    if (groupData.groupQuery.isError && !groupData.groupQuery.isFetching) {
      void groupData.groupQuery.refetch()
    }
    if (groupData.coursesQuery.isError && !groupData.coursesQuery.isFetching) {
      void groupData.coursesQuery.refetch()
    }
    if (usersQuery.isError && !usersQuery.isFetching) void usersQuery.refetch()
  }

  const teacherNameById = new Map(
    (usersQuery.data ?? []).map((user) => [user.id, user.name] as const),
  )
  const teachers = (groupData.group?.teacher_ids ?? []).map((userId) => ({
    userId,
    name: teacherNameById.get(userId) ?? null,
  }))
  const students = groupData.group?.students ?? []
  const studentsCount = groupData.group?.students_count ?? students.length

  const isNotFound = getGroupErrorStatus(groupData.groupQuery.error) === 404
  const error =
    groupData.groupQuery.error ?? groupData.coursesQuery.error ?? usersQuery.error ?? null

  let errorKey: GroupErrorKey | null = null
  if (!isNotFound && error) {
    errorKey = getGroupErrorKey(error, 'admin.groups.detail.error')
  }

  const isError = !!errorKey

  return {
    state: {
      groupId,
      group: groupData.group,
      course: groupData.course,
      teachers,
      students,
      studentsCount,
      teachersCount: teachers.length,
      errorKey,
      isNotFound,
      isPending:
        groupData.groupQuery.isPending || groupData.coursesQuery.isPending || usersQuery.isPending,
      isError,
      isFetching:
        groupData.groupQuery.isFetching ||
        groupData.coursesQuery.isFetching ||
        usersQuery.isFetching,
    },
    queries: {
      group: groupData.groupQuery,
      courses: groupData.coursesQuery,
      users: usersQuery,
    },
    functions: { handleBack, handleRetry },
  }
}
