import rubikCyrillic from '@fontsource-variable/rubik/files/rubik-cyrillic-wght-normal.woff2?url'
import rubikLatin from '@fontsource-variable/rubik/files/rubik-latin-wght-normal.woff2?url'
import { TranslateProvider } from '@kanjou/react'
import type { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { DefaultFunctions, DraftFunctions } from 'messageformat/functions'
import type { ReactNode } from 'react'
import messages from 'virtual:kanjou/uk'
import '@fontsource-variable/rubik'

import '#/assets/styles/global.css'
import 'virtual:uno.css'

import { Toaster } from '#/components/ui/toast'
import { useMotionPreference } from '#/hooks/use-motion-preference'
import { getSession } from '#/lib/session'
import { AppLink } from '#/routes/-components/app-link'
import { readCookie } from '#/utils/cookies'
import { MOTION_PREFERENCE_COOKIE } from '#/utils/motion'

const components = { br: () => <br />, a: AppLink }
const functions = { ...DefaultFunctions, ...DraftFunctions }

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: async ({ context }) => {
    const locale = 'uk' as const
    const user = await context.queryClient.query({
      queryKey: ['session'],
      queryFn: () => getSession(),
      retry: false,
    })
    const animationsDisabled = (await readCookie(MOTION_PREFERENCE_COOKIE)) === 'true'

    return { locale, user, animationsDisabled }
  },
  headers: () => ({ 'Cache-Control': 'private, no-store' }),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Robocoins' },
      {
        name: 'description',
        content:
          'Robocoins - платформа для учнів школи Roboocode. Отримуй робокоїни і купляй за них призи.',
      },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      {
        rel: 'preload',
        href: rubikCyrillic,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: rubikLatin,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
})

function RootDocument({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (location) => location.pathname })
  const context = Route.useRouteContext()
  const motionPreference = useMotionPreference(context?.animationsDisabled)

  const locale = context?.locale ?? 'uk'

  let iconHref = '/icon.svg'
  if (pathname.replace(/\/+$/, '') === '/shop') iconHref = '/icon-galaxy.svg'

  return (
    <html lang={locale} data-reduced-motion={motionPreference.disabled}>
      <head>
        <HeadContent />
        <link rel="icon" href={iconHref} type="image/svg+xml" />
      </head>
      <body>
        <TranslateProvider
          locale={locale}
          messages={messages}
          components={components}
          functions={functions}
        >
          <Toaster>{children}</Toaster>
        </TranslateProvider>
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <div className="h-dvh">
      <Outlet />
    </div>
  )
}
