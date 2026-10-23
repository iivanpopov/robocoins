import { Outlet, createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'

import { AppNavbar } from './-components'

import styles from './_navigation.module.css'

export const Route = createFileRoute('/_authorized/_navigation')({
  component: NavigationLayout,
})

function NavigationLayout() {
  return (
    <div className={styles.layout}>
      <main className={cn(styles.content)}>
        <Outlet />
      </main>
      <AppNavbar />
    </div>
  )
}
