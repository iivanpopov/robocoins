import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'

import { useAuthPage } from './_auth/-hooks'

import styles from './_auth.module.css'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const { state } = useAuthPage()

  return (
    <div className={styles.wrapper}>
      {state.isStudent && <Navigate to="/" replace />}
      {state.isTeacher && <Navigate to="/group" replace />}
      {!state.isStudent && !state.isTeacher && <Outlet />}
    </div>
  )
}
