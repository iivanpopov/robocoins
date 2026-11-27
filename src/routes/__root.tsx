import { TranslateProvider } from '@kanjou/react'
import type { QueryClient } from '@tanstack/react-query'
import { HeadContent, Outlet, createRootRouteWithContext, useMatch } from '@tanstack/react-router'
import { type ReactNode, useLayoutEffect } from 'react'
import messages from 'virtual:kanjou/uk/common'

import { Toaster } from '#/components/ui/toast'

import '#/assets/styles/global.css'
import 'virtual:uno.css'

import { useAnimationsDisabled } from '#/hooks/use-motion-preference'
import { translationComponents, translationFunctions } from '#/lib/translations'
import { NotFoundComponent } from '#/routes/-components/not-found-component'
import { RequestErrorComponent } from '#/routes/-components/request-error-component'
import { readCookie } from '#/utils/cookies'
import { MOTION_PREFERENCE_COOKIE } from '#/utils/motion'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: () => ({
    animationsDisabled: readCookie(MOTION_PREFERENCE_COOKIE) === 'true',
  }),
  shellComponent: RootShell,
  errorComponent: RequestErrorComponent,
  notFoundComponent: NotFoundComponent,
  component: RootComponent,
})

function RootShell(props: { children: ReactNode }) {
  const context = Route.useRouteContext()
  const isStudent =
    useMatch({
      from: '/_authorized',
      shouldThrow: false,
      select: (match) => match.context.user?.role === 'student',
    }) ?? false
  const animationsDisabled = useAnimationsDisabled(context?.animationsDisabled)

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('student', isStudent)
    document.documentElement.dataset.reducedMotion = String(animationsDisabled)
  }, [isStudent, animationsDisabled])

  return (
    <>
      <HeadContent />
      <TranslateProvider
        locale="uk"
        messages={messages}
        functions={translationFunctions}
        components={translationComponents}
      >
        <Toaster>{props.children}</Toaster>
      </TranslateProvider>
    </>
  )
}

function RootComponent() {
  return (
    <div className="h-dvh">
      <Outlet />
    </div>
  )
}
