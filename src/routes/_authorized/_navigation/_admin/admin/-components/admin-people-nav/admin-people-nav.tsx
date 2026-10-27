import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { useResolvedPathname } from '#/routes/-hooks'
import { getTabViewTransition } from '#/routes/-utils'

import styles from '../admin-learning-nav/admin-learning-nav.module.css'

const PEOPLE_TABS = [
  { to: '/admin/people/students', label: 'students.title' },
  { to: '/admin/people/teachers', label: 'admin.people.teachers.title' },
] as const

export function AdminPeopleNav() {
  const t = useTranslate()
  const pathname = useResolvedPathname()
  const isTeachers = pathname.startsWith('/admin/people/teachers')

  let currentIndex = 0
  if (isTeachers) currentIndex = 1

  return (
    <nav className={styles.nav} aria-label={t('admin.people.title')}>
      {PEOPLE_TABS.map((tab, index) => (
        <Link
          key={tab.to}
          to={tab.to}
          className={styles.tab}
          data-active={index === currentIndex}
          viewTransition={getTabViewTransition(currentIndex, index)}
        >
          {t(tab.label)}
        </Link>
      ))}
    </nav>
  )
}
