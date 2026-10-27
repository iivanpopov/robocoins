import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import type { CourseCategoryKey, CourseGroupResponse } from '#/api/types'
import { CategoryIcon } from '#/routes/-components'

import styles from './course-group-row.module.css'

export interface CourseGroupRowProps {
  group: CourseGroupResponse
  category?: CourseCategoryKey
  className?: string
}

export function CourseGroupRow({ group, category, className }: CourseGroupRowProps) {
  const t = useTranslate()

  return (
    <Link
      to="/admin/groups/$groupId"
      params={{ groupId: group.id }}
      className={cn(styles.row, className)}
      data-category={category}
      aria-label={t('admin.groups.open', { name: group.name })}
    >
      <span className={styles.icon}>{!!category && <CategoryIcon category={category} />}</span>
      <span className={styles.name}>{group.name}</span>
      <span aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.caret)} />
    </Link>
  )
}
