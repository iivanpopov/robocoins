import { TranslateProvider } from '@kanjou/react'
import * as Sentry from '@sentry/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter, Link, RouterProvider } from '@tanstack/react-router'
import { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import locales from 'virtual:kanjou/locales'
import '@fontsource-variable/rubik'
import '@fontsource/rubik-mono-one'

import '#/assets/styles/global.css'
import 'virtual:uno.css'
import { queryClient } from '#/lib/query'

import { routeTree } from '../generated/routeTree.gen'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  enabled: import.meta.env.PROD,
  environment: import.meta.env.MODE,
})

const devTeacherUser = {
  name: 'Олена Петрівна',
  avatar: 'star-struck' as const,
  balance: 1000,
  role: 'teacher' as const,
}

const router = createRouter({
  routeTree,
  defaultOnCatch: (error) => Sentry.captureException(error),
  context: {
    user: devTeacherUser,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const locale = 'uk'
const messages = await locales[locale]()

const components = {
  br: () => <br />,
  a: ({ to, children }: { children: ReactNode; to: string }) => <Link to={to}>{children}</Link>,
}

createRoot(document.getElementById('root')!, {
  onUncaughtError: Sentry.reactErrorHandler(),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
}).render(
  <QueryClientProvider client={queryClient}>
    <TranslateProvider locale={locale} messages={messages} components={components}>
      <RouterProvider router={router} />
    </TranslateProvider>
  </QueryClientProvider>,
)
