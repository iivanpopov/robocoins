import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { CourseCategoryKey } from '#/api/types'
import { CategoryIcon } from '#/routes/-components'
import type { Weekday } from '#/routes/-constants'

import styles from './group-card.module.css'

export interface GroupCardSchedule {
  weekday?: Weekday
  time?: string
}

export interface GroupCardData {
  id: number
  name: string
  courseName: string
  category: CourseCategoryKey
  schedule: GroupCardSchedule
  studentsCount?: number
}

export interface GroupCardProps {
  group: GroupCardData
  className?: string
}

export function GroupCard({ group, className }: GroupCardProps) {
  const t = useTranslate()

  return (
    <div className={cn(styles.card, className)} data-category={group.category}>
      <div className={styles['card-icon']}>
        <CategoryIcon category={group.category} />
      </div>
      <div className={styles['card-details']}>
        <h3 className={styles['card-title']}>{group.courseName}</h3>
        <span className={styles.schedule}>
          {group.schedule.weekday && <>{t.unsafe(`weekday.${group.schedule.weekday}`)}</>}
          {group.schedule.weekday && group.schedule.time && ', '}
          {group.schedule.time}
        </span>
      </div>
      {group.studentsCount !== undefined && (
        <div className={styles['card-meta']}>
          <span className={styles['students-count']}>
            {t('group.students-count', { count: group.studentsCount })}
          </span>
        </div>
      )}
    </div>
  )
}
