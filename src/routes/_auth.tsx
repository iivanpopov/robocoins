import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import messages from 'virtual:messages/uk/auth'

import { TranslationProvider } from '#/lib/translations'
import { getHomePath } from '#/routes/-utils'
import { AuthWatermark } from '#/routes/_auth/-components'

import styles from './_auth.module.css'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (!context.user?.role) return

    throw redirect({ to: getHomePath(context.user.role) })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TranslationProvider messages={messages}>
      <div className={styles.wrapper}>
        <AuthWatermark />
        <Outlet />
      </div>
    </TranslationProvider>
  )
}
