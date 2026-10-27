import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'

import { AdminLearningNav, AdminPeopleNav } from './-components'

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
  const isPeopleSection = pathname.startsWith('/admin/people')

  return (
    <>
      {isLearningSection && <AdminLearningNav />}
      {isPeopleSection && <AdminPeopleNav />}
      <Outlet />
    </>
  )
}
