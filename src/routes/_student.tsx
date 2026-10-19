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
  const showNavbar = !!matchRoute({ to: '/' }) || !!matchRoute({ to: '/settings' })

  return (
    <>
      {showNavbar && (
        <div className={styles.layout}>
          <main className={styles.content}>
            <Outlet />
          </main>
          <Navbar aria-label={t('navbar.label')}>
            <Navbar.Item to="/settings" activeOptions={{ exact: true }}>
              <span aria-hidden="true" className="i-ph:gear-bold" />
              <span>{t('navbar.settings')}</span>
            </Navbar.Item>
            <Navbar.Item to="/" activeOptions={{ exact: true }}>
              <span aria-hidden="true" className="i-ph:user-circle-bold" />
              <span>{t('navbar.profile')}</span>
            </Navbar.Item>
          </Navbar>
        </div>
      )}
      {!showNavbar && <Outlet />}
    </>
  )
}
