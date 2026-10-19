import { useQuery } from '@tanstack/react-query'

import { sessionQueryOptions } from '#/lib/session'

export function useAuthPage() {
  const sessionQuery = useQuery(sessionQueryOptions)

  return {
    state: {
      isStudent: sessionQuery.data?.role === 'student',
      isTeacher: sessionQuery.data?.role === 'teacher',
    },
    queries: {
      session: sessionQuery,
    },
  }
}
