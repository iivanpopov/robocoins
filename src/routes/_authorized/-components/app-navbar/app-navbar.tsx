import { useTranslate } from '@kanjou/react'
import { useLocation } from '@tanstack/react-router'
import { cn } from 'cn'

import { Navbar, NavbarItem } from '#/components/ui'

import { useAppNavbar } from './-hooks'

import styles from './app-navbar.module.css'

export function AppNavbar() {
  const t = useTranslate()
  const location = useLocation()

  const navbar = useAppNavbar()

  return (
    <Navbar
      aria-label={t('navbar.label')}
      className={cn(
        styles.navbar,
        location.pathname === '/shop' && 'galaxy',
        location.pathname === '/shop' && styles['shop-navbar'],
      )}
    >
      {navbar.items.map((item) => (
        <NavbarItem
          key={item.to}
          active={navbar.activePath === item.to}
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
