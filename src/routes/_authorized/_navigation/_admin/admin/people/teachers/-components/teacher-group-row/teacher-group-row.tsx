import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { TeacherGroupProfile } from '#/api/types'

import styles from './teacher-group-row.module.css'

export interface TeacherGroupRowProps {
  group: TeacherGroupProfile
  className?: string
}

export function TeacherGroupRow({ group, className }: TeacherGroupRowProps) {
  const t = useTranslate()

  return (
    <article className={cn(styles.row, className)}>
      <span className={styles.icon} aria-hidden="true">
        <span className="i-ph:users-three-duotone" />
      </span>
      <span className={styles.details}>
        <span className={styles.name}>{group.name}</span>
        <span className={styles.course}>{group.course_name}</span>
      </span>
      <span className={styles.count}>
        {t('group.students-count', { count: group.students_count })}
      </span>
    </article>
  )
}
