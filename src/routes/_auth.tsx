import { Await, createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'

import { AuthWatermark } from '#/routes/_auth/-components'

import styles from './_auth.module.css'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const context = Route.useRouteContext()

  return (
    <div className={styles.wrapper}>
      <AuthWatermark />
      <Suspense fallback={null}>
        <Await promise={context.user}>
          {(user) => {
            if (user?.role === 'student') return <Navigate to="/" replace />
            if (user?.role === 'teacher') return <Navigate to="/group" replace />
            return null
          }}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  )
}
