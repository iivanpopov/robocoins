import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useLocation } from '@tanstack/react-router'
import { cn } from 'cn'

import { AppNavbar } from './-components'

import styles from './_navigation.module.css'

export const Route = createFileRoute('/_authorized/_navigation')({
  component: NavigationLayout,
})

function NavigationLayout() {
  const location = useLocation()
  const isShop = location.pathname === '/shop'

  return (
    <div className={cn(styles.layout, isShop && 'dark', isShop && styles['shop-layout'])}>
      <main className={cn(styles.content, isShop && styles['shop-content'])}>
        <Outlet />
      </main>
      <AppNavbar />
    </div>
  )
}
