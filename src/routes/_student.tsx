import { useTranslate } from '@kanjou/react'
import { Outlet, createFileRoute, redirect, useMatchRoute } from '@tanstack/react-router'

import { Navbar } from './-components'
import { LOCALSTORAGE_DID_REGISTER } from './-constants'

import styles from './-components/authenticated-layout.module.css'

export const Route = createFileRoute('/_student')({
  component: StudentLayout,
  beforeLoad: async ({ context }) => {
    const user = await context.user

    if (user?.role === 'teacher') throw redirect({ to: '/group' })
    if (user?.role === 'student') return { user }

    const to = localStorage.getItem(LOCALSTORAGE_DID_REGISTER) ? '/login' : '/register'
    throw redirect({ to })
  },
})

function StudentLayout() {
  const t = useTranslate()
  const matchRoute = useMatchRoute()
  const showNavbar =
    !!matchRoute({ to: '/' }) || !!matchRoute({ to: '/settings' }) || !!matchRoute({ to: '/shop' })

  return (
    <>
      {showNavbar && (
        <div className={styles.layout}>
          <main className={styles.content}>
            <Outlet />
          </main>
          <Navbar paths={['/settings', '/', '/shop']} aria-label={t('navbar.label')}>
            <Navbar.Item to="/settings" aria-label={t('navbar.settings')}>
              <div aria-hidden="true" className="i-ph:gear" />
              <span>{t('navbar.settings')}</span>
            </Navbar.Item>
            <Navbar.Item to="/" aria-label={t('navbar.home')}>
              <div aria-hidden="true" className="i-ph:house" />
              <span>{t('navbar.home')}</span>
            </Navbar.Item>
            <Navbar.Item to="/shop" aria-label={t('navbar.shop')}>
              <div aria-hidden="true" className="i-ph:storefront" />
              <span>{t('navbar.shop')}</span>
            </Navbar.Item>
          </Navbar>
        </div>
      )}
      {!showNavbar && <Outlet />}
    </>
  )
}
