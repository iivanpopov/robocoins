import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

import { AuthWatermark } from '#/routes/_auth/-components'

import styles from './_auth.module.css'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.user?.role === 'student') throw redirect({ to: '/' })
    if (context.user?.role === 'teacher') throw redirect({ to: '/group' })
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
