import { Outlet, createFileRoute } from '@tanstack/react-router'

import { useResolvedPathname } from '#/routes/-hooks'

import { AdminLearningNav, AdminPeopleNav } from './-components'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  const pathname = useResolvedPathname()
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
