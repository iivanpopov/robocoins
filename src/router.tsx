import { captureException } from '@sentry/tanstackstart-react'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { getShopRewardsShopGetQueryOptions } from '#/api/hooks/useGetShopRewardsShopGet'
import { createQueryClient } from '#/lib/query'
import { getSession } from '#/lib/session'
import { ErrorComponent } from '#/routes/-components/error-component'
import { NotFoundComponent } from '#/routes/-components/not-found-component'
import { PendingComponent } from '#/routes/-components/pending'

import { routeTree } from '../generated/routeTree.gen'

export function getRouter() {
  const queryClient = createQueryClient()
  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    defaultNotFoundComponent: NotFoundComponent,
    defaultErrorComponent: ErrorComponent,
    defaultPendingComponent: PendingComponent,
    defaultOnCatch: (error) => captureException(error),
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  if (typeof window !== 'undefined') {
    void queryClient
      .query({ queryKey: ['session'], queryFn: () => getSession(), retry: false })
      .then((user) =>
        user?.role === 'student'
          ? queryClient.query(getShopRewardsShopGetQueryOptions())
          : undefined,
      )
      .catch(() => undefined)
  }

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
