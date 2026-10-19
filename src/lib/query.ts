import * as Sentry from '@sentry/react'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      Sentry.captureException(error, { tags: { source: 'query' } })
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      Sentry.captureException(error, { tags: { source: 'mutation' } })
    },
  }),
})
