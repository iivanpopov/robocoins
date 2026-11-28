import { captureException } from '@sentry/react'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

import { ResponseError } from '#/api/.kubb/client'
import { ValidationError } from '#/api/.kubb/standardSchema'

interface RequestMeta extends Record<string, unknown> {
  expectedErrorStatuses?: number[]
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: RequestMeta
    mutationMeta: RequestMeta
  }
}

export function isExpectedRequestError(error: unknown, meta?: RequestMeta) {
  if (!ResponseError.is(error) && !(error instanceof ValidationError)) return false
  const status = error.status
  if (status === 401) return true
  if (status === undefined || status < 400 || status >= 500) return false

  return meta?.expectedErrorStatuses?.includes(status) ?? false
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
        if (isExpectedRequestError(error, query.meta)) return

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
        if (isExpectedRequestError(error, mutation.meta)) return

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
