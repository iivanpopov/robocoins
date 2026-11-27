import { TranslateProvider } from '@kanjou/react'
import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import messages from 'virtual:kanjou/uk/auth'

import { querySession } from '#/routes/-actions/get-session'
import { RequestErrorComponent } from '#/routes/-components/request-error-component'
import { getHomePath } from '#/routes/-utils'
import { validateGoogleLoginSearch } from '#/routes/-utils/google-oauth-notice'
import { AuthWatermark } from '#/routes/_auth/-components'

import styles from './route.module.css'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async (match) => {
    const pathname = match.location.pathname.replace(/\/+$/, '')
    if (pathname === '/login' && validateGoogleLoginSearch(match.location.search).google) return

    const user = await querySession(match.context.queryClient)
    if (!user?.role) return

    throw redirect({ to: getHomePath(user.role) })
  },
  errorComponent: RequestErrorComponent,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TranslateProvider messages={messages}>
      <div className={styles.wrapper}>
        <AuthWatermark />
        <Outlet />
      </div>
    </TranslateProvider>
  )
}
