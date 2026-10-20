import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AppNavbar } from './-components/app-navbar'

import styles from './_navigation.module.css'

export const Route = createFileRoute('/_authorized/_navigation')({
  component: NavigationLayout,
})

function NavigationLayout() {
  return (
    <div className={styles.layout}>
      <main className={styles.content}>
        <Outlet />
      </main>
      <AppNavbar />
    </div>
  )
}
