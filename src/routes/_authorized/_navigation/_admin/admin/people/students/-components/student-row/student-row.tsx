import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { StudentAvatar } from '../student-avatar'

import styles from './student-row.module.css'

export interface StudentRowData {
  id: number
  name: string
  avatar?: string | null
  courseNames: string[]
  groupCount: number
}

export interface StudentRowProps {
  student: StudentRowData
}

export function StudentRow({ student }: StudentRowProps) {
  const t = useTranslate()

  return (
    <Link
      to="/admin/people/students/$studentId"
      params={{ studentId: student.id }}
      className={styles.row}
    >
      <StudentAvatar name={student.name} avatar={student.avatar} />
      <div className={styles.details}>
        <span className={styles.name}>{student.name}</span>
        {!!student.courseNames.length && (
          <span className={styles.courses}>{student.courseNames.join(' · ')}</span>
        )}
        {!student.courseNames.length && (
          <span className={styles.courses}>{t('students.no-groups')}</span>
        )}
      </div>
      <div className={styles.aside}>
        {!!student.groupCount && (
          <span className={styles.count}>
            {t('students.group-count', { count: student.groupCount })}
          </span>
        )}
        <span aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.arrow)} />
      </div>
    </Link>
  )
}
