import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { useResolvedPathname } from '#/routes/-hooks'
import { getTabViewTransition } from '#/routes/-utils'

import styles from './admin-learning-nav.module.css'

const LEARNING_TABS = [
  { to: '/admin', label: 'navbar.groups' },
  { to: '/admin/courses', label: 'admin.courses.title' },
  { to: '/admin/courses/categories', label: 'admin.courses.categories' },
] as const

export function AdminLearningNav() {
  const t = useTranslate()
  const pathname = useResolvedPathname()

  const isCategories = pathname.startsWith('/admin/courses/categories')
  const isCourses = pathname.startsWith('/admin/courses') && !isCategories
  const isGroups =
    !isCourses && !isCategories && (pathname === '/admin' || pathname.startsWith('/admin/groups'))

  let currentIndex = -1
  if (isGroups) currentIndex = 0
  if (isCourses) currentIndex = 1
  if (isCategories) currentIndex = 2

  return (
    <nav className={styles.nav} aria-label={t('navbar.learning')}>
      {LEARNING_TABS.map((tab, index) => (
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
