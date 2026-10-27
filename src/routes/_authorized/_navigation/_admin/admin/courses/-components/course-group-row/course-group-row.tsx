import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { CourseGroupResponse } from '#/api/types'

import styles from './course-group-row.module.css'

export interface CourseGroupRowProps {
  group: CourseGroupResponse
  className?: string
}

export function CourseGroupRow({ group, className }: CourseGroupRowProps) {
  const t = useTranslate()

  const studentsCount = group.students_count ?? 0
  const teachersCount = group.teacher_ids?.length ?? 0

  return (
    <article className={cn(styles.row, className)}>
      <span aria-hidden="true" className={styles.icon} />
      <div className={styles.details}>
        <h3 className={styles.name}>{group.name}</h3>
        <div className={styles.meta}>
          <span>{t('group.students-count', { count: studentsCount })}</span>
          <span>{t('admin.courses.teachers-count', { count: teachersCount })}</span>
        </div>
      </div>
    </article>
  )
}
