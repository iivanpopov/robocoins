import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import type { CourseResponse } from '#/api/types'
import { CategoryIcon } from '#/routes/-components'

import styles from './course-row.module.css'

export interface CourseRowProps {
  course: CourseResponse
  className?: string
}

export function CourseRow({ course, className }: CourseRowProps) {
  const t = useTranslate()

  const groupsCount = course.groups_count ?? course.groups?.length ?? 0
  const groupNames = (course.groups ?? []).map((group) => group.name).join(', ')

  return (
    <Link
      to="/admin/courses/$courseId"
      params={{ courseId: course.id }}
      className={cn(styles.row, className)}
      data-category={course.category}
    >
      <div className={styles.icon}>
        <CategoryIcon category={course.category} />
      </div>
      <div className={styles.details}>
        <h2 className={styles.name}>{course.name}</h2>
        <span className={styles.category}>
          {t('course.category', { category: course.category })}
        </span>
        {!!groupNames && <span className={styles.groups}>{groupNames}</span>}
      </div>
      <div className={styles.meta}>
        <span className={styles.count}>
          {t('admin.courses.groups-count', { count: groupsCount })}
        </span>
        <span aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.caret)} />
      </div>
    </Link>
  )
}
