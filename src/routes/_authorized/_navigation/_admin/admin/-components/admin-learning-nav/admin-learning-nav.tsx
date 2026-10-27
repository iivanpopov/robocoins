import { useTranslate } from '@kanjou/react'
import { Link, useLocation } from '@tanstack/react-router'

import styles from './admin-learning-nav.module.css'

export function AdminLearningNav() {
  const t = useTranslate()
  const location = useLocation()
  const pathname = location.pathname.replace(/\/+$/, '') || '/'

  const isCategories = pathname.startsWith('/admin/courses/categories')
  const isCourses = pathname.startsWith('/admin/courses') && !isCategories
  const isGroups =
    !isCourses && !isCategories && (pathname === '/admin' || pathname.startsWith('/admin/groups'))

  return (
    <nav className={styles.nav} aria-label={t('navbar.learning')}>
      <Link to="/admin" className={styles.tab} data-active={isGroups}>
        {t('navbar.groups')}
      </Link>
      <Link to="/admin/courses" className={styles.tab} data-active={isCourses}>
        {t('admin.courses.title')}
      </Link>
      <Link to="/admin/courses/categories" className={styles.tab} data-active={isCategories}>
        {t('admin.courses.categories')}
      </Link>
    </nav>
  )
}
