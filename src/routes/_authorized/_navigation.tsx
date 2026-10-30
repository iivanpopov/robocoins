import { Outlet, createFileRoute, useRouteContext } from '@tanstack/react-router'
import { cn } from 'cn'

import { AppNavbar } from './-components'

import styles from './_navigation.module.css'

export const Route = createFileRoute('/_authorized/_navigation')({
  component: NavigationLayout,
})

function NavigationLayout() {
  const { user } = useRouteContext({ from: '/_authorized' })
  const isStudent = user?.role === 'student'

  return (
    <div className={cn(styles.layout, isStudent && 'student')}>
      <main className={cn(styles.content)} data-navigation-scroll>
        <Outlet />
      </main>
      <AppNavbar />
    </div>
  )
}
