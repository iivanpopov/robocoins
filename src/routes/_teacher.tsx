import { useTranslate } from '@kanjou/react'
import { Outlet, createFileRoute, redirect, useMatchRoute } from '@tanstack/react-router'

import { Navbar } from './-components'
import { LOCALSTORAGE_DID_REGISTER } from './-constants'

import styles from './-components/authenticated-layout.module.css'

export const Route = createFileRoute('/_teacher')({
  component: TeacherLayout,
  beforeLoad: async ({ context }) => {
    const user = await context.user

    if (user?.role === 'student') throw redirect({ to: '/' })
    if (user?.role === 'teacher') return { user }

    const to = localStorage.getItem(LOCALSTORAGE_DID_REGISTER) ? '/login' : '/register'
    throw redirect({ to })
  },
})

function TeacherLayout() {
  const t = useTranslate()
  const matchRoute = useMatchRoute()
  const showNavbar = !!matchRoute({ to: '/group' }) || !!matchRoute({ to: '/teacher/settings' })

  return (
    <>
      {showNavbar && (
        <div className={styles.layout}>
          <main className={styles.content}>
            <Outlet />
          </main>
          <Navbar aria-label={t('navbar.label')}>
            <Navbar.Item to="/teacher/settings" activeOptions={{ exact: true }}>
              <span aria-hidden="true" className="i-ph:gear-bold" />
              <span>{t('navbar.settings')}</span>
            </Navbar.Item>
            <Navbar.Item to="/group" activeOptions={{ exact: true }}>
              <span aria-hidden="true" className="i-ph:users-three-bold" />
              <span>{t('navbar.groups')}</span>
            </Navbar.Item>
          </Navbar>
        </div>
      )}
      {!showNavbar && <Outlet />}
    </>
  )
}
