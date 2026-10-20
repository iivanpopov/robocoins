import { useTranslate } from '@kanjou/react'
import { useRouteContext } from '@tanstack/react-router'

import { Navbar, NavbarItem } from '#/components/ui'

import { useAppNavbar } from './-hooks'

import styles from './app-navbar.module.css'

export function AppNavbar() {
  const context = useRouteContext({ from: '/_authorized' })
  const t = useTranslate()
  const navbar = useAppNavbar(context.user.role!)

  return (
    <Navbar aria-label={t('navbar.label')} className={styles.navbar}>
      {navbar.items.map((item) => (
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
