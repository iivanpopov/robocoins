import * as Sentry from '@sentry/tanstackstart-react'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

import { ResponseError } from '#/api/.kubb/client'

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
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (shouldIgnoreError(error, query.meta)) return

        Sentry.captureException(error, { tags: { source: 'query' } })
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        if (shouldIgnoreError(error, mutation.meta)) return

        Sentry.captureException(error, { tags: { source: 'mutation' } })
      },
    }),
  })
}
