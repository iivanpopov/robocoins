import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { getInitial } from '#/routes/-utils'

import styles from './teacher-row.module.css'

export interface TeacherRowData {
  userId: number
  name: string
}

export interface TeacherRowProps {
  teacher: TeacherRowData
}

export function TeacherRow({ teacher }: TeacherRowProps) {
  const t = useTranslate()

  return (
    <Link
      to="/admin/people/teachers/$userId"
      params={{ userId: teacher.userId }}
      className={styles.row}
      aria-label={t('profile.open-label', { name: teacher.name })}
    >
      <span className={styles.avatar} aria-hidden="true">
        {getInitial(teacher.name)}
      </span>
      <span className={styles.details}>
        <span className={styles.name}>{teacher.name}</span>
        <span className={styles.role}>{t('role.teacher')}</span>
      </span>
      <span aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.arrow)} />
    </Link>
  )
}
