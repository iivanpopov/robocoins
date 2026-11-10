import { Outlet, createFileRoute, useRouteContext } from '@tanstack/react-router'

import { cn } from '#/utils/cn'

import { AppNavbar } from './-components'

import styles from './_navigation.module.css'

export const Route = createFileRoute('/_authorized/_navigation')({
  component: NavigationLayout,
})

function NavigationLayout() {
  const routeContext = useRouteContext({ from: '/_authorized' })

  const isStudent = routeContext.user?.role === 'student'

  return (
    <div className={cn(styles.layout, isStudent && 'student')}>
      <main className={cn(styles.content)} data-navigation-scroll>
        <Outlet />
      </main>
      <AppNavbar />
    </div>
  )
}
