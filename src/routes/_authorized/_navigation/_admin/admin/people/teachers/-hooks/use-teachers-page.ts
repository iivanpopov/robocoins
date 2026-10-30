import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetUsersUsersGet } from '#/api/hooks/useGetUsersUsersGet'

import type { TeacherRowData } from '../-components'
import { getRequestErrorStatus } from '../-utils'

export function useTeachersPage() {
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')

  const usersQuery = useGetUsersUsersGet()

  function handleSearchChange(query: string) {
    setSearchQuery(query)
  }

  function handleRegister() {
    void navigate({ to: '/admin/people/teachers/register' })
  }

  function handleRetry() {
    if (usersQuery.isError && !usersQuery.isFetching) void usersQuery.refetch()
  }

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('uk')
  const teachers = (usersQuery.data ?? []).flatMap((user) => {
    if (user.role !== 'teacher') return []
    return [{ userId: user.id, name: user.name } satisfies TeacherRowData]
  })
  const filteredTeachers = teachers
    .filter((teacher) => {
      if (!normalizedQuery) return true
      return teacher.name.toLocaleLowerCase('uk').includes(normalizedQuery)
    })
    .toSorted((first, second) => first.name.localeCompare(second.name, 'uk'))
  const isPending = usersQuery.isPending
  const isError = usersQuery.isError

  return {
    state: {
      teachers: filteredTeachers,
      searchQuery,
      hasSearch: !!normalizedQuery,
      errorStatus: getRequestErrorStatus(usersQuery.error),
      isPending,
      isError,
      isRetrying: usersQuery.isFetching,
      isReady: !isPending && !isError,
    },
    queries: { users: usersQuery },
    functions: { handleSearchChange, handleRegister, handleRetry },
  }
}
