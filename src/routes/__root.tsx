import { TranslateProvider } from '@kanjou/react'
import type { QueryClient } from '@tanstack/react-query'
import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { type ReactNode, useLayoutEffect } from 'react'
import messages from 'virtual:kanjou/uk/common'

import { Toaster } from '#/components/ui/toast'

import '#/assets/styles/global.css'
import 'virtual:uno.css'

import { useAnimationsDisabled } from '#/hooks/use-motion-preference'
import { translationComponents, translationFunctions } from '#/lib/translations'
import { NotFoundComponent } from '#/routes/-components/not-found-component'
import { RequestErrorComponent } from '#/routes/-components/request-error-component'
import { animationsDisabled } from '#/utils/motion'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: () => ({
    animationsDisabled: animationsDisabled(),
  }),
  shellComponent: RootShell,
  errorComponent: RequestErrorComponent,
  notFoundComponent: NotFoundComponent,
  component: RootComponent,
})

function RootShell(props: { children: ReactNode }) {
  const context = Route.useRouteContext()
  const animationsDisabled = useAnimationsDisabled(context?.animationsDisabled)

  useLayoutEffect(() => {
    document.documentElement.dataset.reducedMotion = String(animationsDisabled)
  }, [animationsDisabled])

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
