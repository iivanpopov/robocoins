import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'

import { sessionQueryOptions } from '#/lib/session'

import styles from './_auth.module.css'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const sessionQuery = useQuery(sessionQueryOptions)

  const isStudent = sessionQuery.data?.role === 'student'
  const isTeacher = sessionQuery.data?.role === 'teacher'

  return (
    <div className={styles.wrapper}>
      {isStudent && <Navigate to="/" replace />}
      {isTeacher && <Navigate to="/group" replace />}
      {!isStudent && !isTeacher && <Outlet />}
    </div>
  )
}
