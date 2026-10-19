import { type QueryClient, queryOptions } from '@tanstack/react-query'

import { ResponseError } from '#/api/.kubb/client'
import { getCurrentUserAuthMeGet } from '#/api/clients/getCurrentUserAuthMeGet'
import { getCurrentUserAuthMeGetQueryKey } from '#/api/hooks/useGetCurrentUserAuthMeGet'

export const sessionQueryOptions = queryOptions({
  queryKey: getCurrentUserAuthMeGetQueryKey(),
  queryFn: async ({ signal }) => {
    try {
      return await getCurrentUserAuthMeGet({ signal }).unwrap()
    } catch (error) {
      if (ResponseError.is(error) && error.status === 401) return null

      throw error
    }
  },
  staleTime: 30_000,
  retry: false,
  throwOnError: false,
})

export async function refreshSession(queryClient: QueryClient) {
  await queryClient.cancelQueries({ queryKey: sessionQueryOptions.queryKey })
  await queryClient.invalidateQueries({
    queryKey: sessionQueryOptions.queryKey,
    refetchType: 'none',
  })

  return queryClient.fetchQuery(sessionQueryOptions)
}
