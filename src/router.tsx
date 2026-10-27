import { captureException } from '@sentry/tanstackstart-react'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { createQueryClient } from '#/lib/query'
import { ErrorComponent } from '#/routes/-components/error-component'
import { NotFoundComponent } from '#/routes/-components/not-found-component'
import { PendingComponent } from '#/routes/-components/pending-component'

import { routeTree } from '../generated/routeTree.gen'

export function getRouter() {
  const queryClient = createQueryClient()
  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    scrollRestorationBehavior: 'instant',
    getScrollRestorationKey: (location) => {
      const pathname = location.pathname.replace(/\/+$/, '') || '/'
      if (pathname === '/') return 'student-home'
      return location.state.__TSR_key ?? location.href
    },
    scrollToTopSelectors: ['[data-navigation-scroll]'],
    defaultNotFoundComponent: NotFoundComponent,
    defaultErrorComponent: ErrorComponent,
    defaultPendingComponent: PendingComponent,
    defaultOnCatch: (error) => captureException(error),
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
