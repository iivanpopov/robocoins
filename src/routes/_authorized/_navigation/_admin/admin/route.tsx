import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'

import { AdminLearningNav } from './-components'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const location = useLocation()
  const pathname = location.pathname.replace(/\/+$/, '') || '/'
  const isLearningSection =
    pathname === '/admin' ||
    pathname.startsWith('/admin/groups') ||
    pathname.startsWith('/admin/courses')

  return (
    <>
      {isLearningSection && <AdminLearningNav />}
      <Outlet />
    </>
  )
}
