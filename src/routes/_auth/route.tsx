import { TranslateProvider } from '@kanjou/react'
import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import messages from 'virtual:kanjou/uk/auth'

import { getHomePath } from '#/routes/-utils'
import { AuthWatermark } from '#/routes/_auth/-components'

import styles from './route.module.css'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (!context.user?.role) return

    throw redirect({ to: getHomePath(context.user.role) })
  },
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
