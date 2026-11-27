import { captureException } from '@sentry/tanstackstart-react'
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
        gcTime: 30 * 60_000,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (shouldIgnoreError(error, query.meta)) return

        if (import.meta.env.DEV) {
          console.error('[query]', error.stack ?? error.message)
          if (ResponseError.is(error)) {
            console.error('[query response body]', error.data)
          }
        }
        captureException(error, { tags: { source: 'query' } })
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        if (shouldIgnoreError(error, mutation.meta)) return

        if (import.meta.env.DEV) {
          console.error('[mutation]', error.stack ?? error.message)
          if (ResponseError.is(error)) {
            console.error('[mutation response body]', error.data)
          }
        }
        captureException(error, { tags: { source: 'mutation' } })
      },
    }),
  })
}
