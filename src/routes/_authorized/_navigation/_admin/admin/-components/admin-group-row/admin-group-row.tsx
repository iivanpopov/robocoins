import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { CourseCategoryKey } from '#/api/types'
import { CategoryIcon } from '#/routes/-components'

import styles from './admin-group-row.module.css'

export interface AdminGroupRowData {
  id: number
  name: string
  courseName: string
  category: CourseCategoryKey
  studentsCount: number
}

export interface AdminGroupRowProps {
  group: AdminGroupRowData
  className?: string
}

export function AdminGroupRow({ group, className }: AdminGroupRowProps) {
  const t = useTranslate()

  return (
    <article className={cn(styles.row, className)} data-category={group.category}>
      <div className={styles.icon}>
        <CategoryIcon category={group.category} />
      </div>
      <div className={styles.details}>
        <h2 className={styles.name}>{group.name}</h2>
        <span className={styles.course}>{group.courseName}</span>
      </div>
      <span className={styles.count}>
        {t('group.students-count', { count: group.studentsCount })}
      </span>
    </article>
  )
}
