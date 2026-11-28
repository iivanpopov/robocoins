import type { QueryClient } from '@tanstack/react-query'

import { ValidationError } from '#/api/.kubb/standardSchema'
import { getCurrentUserAuthMeGet } from '#/api/clients/getCurrentUserAuthMeGet'

export function querySession(queryClient: QueryClient) {
  return queryClient.query({
    queryKey: ['session'],
    queryFn: getSession,
    retry: false,
  })
}

export async function getSession() {
  try {
    const result = await getCurrentUserAuthMeGet({
      throwOnError: false,
      options: { cache: 'no-store' },
    })
    if (result.response.status === 401) return null
    if (!result.response.ok || !result.data) throw new Error('Unable to load the current session')
    return result.data
  } catch (error) {
    if (error instanceof ValidationError && error.status === 401) return null
    throw error
  }
}
