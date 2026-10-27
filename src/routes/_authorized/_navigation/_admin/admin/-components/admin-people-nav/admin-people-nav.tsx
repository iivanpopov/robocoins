import { useTranslate } from '@kanjou/react'
import { Link, useLocation } from '@tanstack/react-router'

import styles from '../admin-learning-nav/admin-learning-nav.module.css'

export function AdminPeopleNav() {
  const t = useTranslate()
  const location = useLocation()
  const pathname = location.pathname.replace(/\/+$/, '') || '/'
  const isTeachers = pathname.startsWith('/admin/people/teachers')
  const isStudents = !isTeachers

  return (
    <nav className={styles.nav} aria-label={t('admin.people.title')}>
      <Link to="/admin/people/students" className={styles.tab} data-active={isStudents}>
        {t('students.title')}
      </Link>
      <Link to="/admin/people/teachers" className={styles.tab} data-active={isTeachers}>
        {t('admin.people.teachers.title')}
      </Link>
    </nav>
  )
}
