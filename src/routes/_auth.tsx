import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

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
    <div className={styles.wrapper}>
      <AuthWatermark />
      <Outlet />
    </div>
  )
}
