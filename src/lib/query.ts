import { captureException } from '@sentry/tanstackstart-react'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

import { ResponseError } from '#/api/.kubb/client'
import {
  CACHE_GC_TIME,
  CATALOG_QUERY_KEYS,
  CATALOG_STALE_TIME,
  DEFAULT_STALE_TIME,
  LIVE_QUERY_KEYS,
  LIVE_STALE_TIME,
} from '#/constants'

interface RequestMeta extends Record<string, unknown> {
  expectedErrorStatuses?: number[]
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: RequestMeta
    mutationMeta: RequestMeta
  }
}

function shouldIgnoreError(error: unknown, meta: RequestMeta | undefined) {
  if (!ResponseError.is(error)) return false
  if (error.status === 401) return true
  if (error.status < 400 || error.status >= 500) return false

  return meta?.expectedErrorStatuses?.includes(error.status) ?? false
}

export function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        gcTime: CACHE_GC_TIME,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (shouldIgnoreError(error, query.meta)) return

        captureException(error, { tags: { source: 'query' } })
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        if (shouldIgnoreError(error, mutation.meta)) return

        captureException(error, { tags: { source: 'mutation' } })
      },
    }),
  })

  for (const key of CATALOG_QUERY_KEYS) {
    queryClient.setQueryDefaults(key, { staleTime: CATALOG_STALE_TIME })
  }
  for (const key of LIVE_QUERY_KEYS) {
    queryClient.setQueryDefaults(key, { staleTime: LIVE_STALE_TIME })
  }

  return queryClient
}
