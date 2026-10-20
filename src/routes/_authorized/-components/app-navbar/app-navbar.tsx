import { useTranslate } from '@kanjou/react'
import { useRouteContext } from '@tanstack/react-router'

import { Navbar, NavbarItem } from '#/components/ui'

import { useAppNavbar } from './-hooks'

import styles from './app-navbar.module.css'

const NAVIGATION_ITEMS = {
  teacher: [
    { to: '/settings', icon: 'i-ph:gear', label: 'navbar.settings' },
    { to: '/group', icon: 'i-ph:users-three', label: 'navbar.groups' },
  ],
  student: [
    { to: '/settings', icon: 'i-ph:gear', label: 'navbar.settings' },
    { to: '/', icon: 'i-ph:house', label: 'navbar.home' },
    { to: '/shop', icon: 'i-ph:storefront', label: 'navbar.shop' },
  ],
} as const

export function AppNavbar() {
  const t = useTranslate()
  const context = useRouteContext({ from: '/_authorized' })
  const role = context.user.role!

  const items = NAVIGATION_ITEMS[role]
  const navbar = useAppNavbar(items.map((item) => item.to))

  return (
    <Navbar aria-label={t('navbar.label')} className={styles.navbar}>
      {items.map((item) => (
        <NavbarItem
          key={item.to}
          active={navbar.currentPath === item.to}
          onClick={() => navbar.handleNavigate(item.to)}
          aria-label={t(item.label)}
        >
          <div aria-hidden="true" className={item.icon} />
          <span>{t(item.label)}</span>
        </NavbarItem>
      ))}
    </Navbar>
  )
}
