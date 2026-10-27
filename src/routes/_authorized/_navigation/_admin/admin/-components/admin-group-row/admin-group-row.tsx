import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import type { CourseCategoryKey } from '#/api/types'
import { CategoryIcon } from '#/routes/-components'

import styles from './admin-group-row.module.css'

export interface AdminGroupRowTeacher {
  userId: number
  name: string | null
}

export interface AdminGroupRowData {
  id: number
  name: string
  courseName: string
  category: CourseCategoryKey
  studentsCount: number
  teachers: AdminGroupRowTeacher[]
}

export interface AdminGroupRowProps {
  group: AdminGroupRowData
  className?: string
}

export function AdminGroupRow({ group, className }: AdminGroupRowProps) {
  const t = useTranslate()

  const teacherNames = group.teachers.flatMap((teacher) => {
    if (!teacher.name) return []
    return [teacher.name]
  })
  const teacherLabel = teacherNames.join(', ')

  return (
    <Link
      to="/admin/groups/$groupId"
      params={{ groupId: group.id }}
      className={cn(styles.row, className)}
      data-category={group.category}
      aria-label={t('admin.groups.open', { name: group.name })}
    >
      <div className={styles.icon}>
        <CategoryIcon category={group.category} />
      </div>
      <div className={styles.details}>
        <h2 className={styles.name}>{group.name}</h2>
        <span className={styles.course}>{group.courseName}</span>
        {!!teacherLabel && <span className={styles.teachers}>{teacherLabel}</span>}
        {!teacherLabel && <span className={styles.teachers}>{t('admin.groups.no-teacher')}</span>}
      </div>
      <div className={styles.meta}>
        <span className={styles.count}>
          {t('group.students-count', { count: group.studentsCount })}
        </span>
        <span aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.caret)} />
      </div>
    </Link>
  )
}
