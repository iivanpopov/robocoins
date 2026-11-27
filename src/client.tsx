import '#/lib/sentry'
import { captureException } from '@sentry/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createQueryClient, isExpectedRequestError } from '#/lib/query'
import { ErrorComponent } from '#/routes/-components/error-component'
import { NotFoundComponent } from '#/routes/-components/not-found-component'
import { PendingComponent } from '#/routes/-components/pending-component'

import { routeTree } from '../generated/routeTree.gen'

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
  notFoundMode: 'root',
  defaultNotFoundComponent: NotFoundComponent,
  defaultErrorComponent: ErrorComponent,
  defaultPendingComponent: PendingComponent,
  defaultOnCatch: (error) => {
    if (isExpectedRequestError(error)) return

    if (import.meta.env.DEV) {
      console.error(
        '[router]',
        error instanceof Error ? (error.stack ?? error.message) : String(error),
      )
    }
    captureException(error)
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
