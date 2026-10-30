import { useGetUsersUsersGet } from '#/api/hooks/useGetUsersUsersGet'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'

import type { TeacherOption } from '../-types'

export function useTeacherOptions() {
  const usersQuery = useGetUsersUsersGet()

  const options = (usersQuery.data ?? [])
    .flatMap((user) => {
      if (user.role !== 'teacher') return []
      return [{ userId: user.id, name: user.name } satisfies TeacherOption]
    })
    .toSorted((first, second) => {
      if (!first.name && !second.name) return first.userId - second.userId
      if (!first.name) return 1
      if (!second.name) return -1
      return first.name.localeCompare(second.name, UKRAINIAN_LOCALE)
    })

  return {
    options,
    usersQuery,
    isPending: usersQuery.isPending,
    isError: usersQuery.isError,
    isFetching: usersQuery.isFetching,
  }
}
