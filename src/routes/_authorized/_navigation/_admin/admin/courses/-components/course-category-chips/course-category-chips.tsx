import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { CourseCategoryKey } from '#/api/types'
import { Chip } from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'

import { COURSE_CATEGORIES, CourseCategoryFilter } from '../../-constants'

import styles from './course-category-chips.module.css'

export interface CourseCategoryChipsProps {
  value: CourseCategoryFilter
  onSelect: (category: CourseCategoryFilter) => void
  counts?: Record<CourseCategoryKey, number>
  allCount?: number
  showAll?: boolean
  className?: string
}

export function CourseCategoryChips({
  value,
  onSelect,
  counts,
  allCount = 0,
  showAll = false,
  className,
}: CourseCategoryChipsProps) {
  const t = useTranslate()

  return (
    <div className={cn(styles.chips, className)}>
      {showAll && (
        <Chip
          selected={value === CourseCategoryFilter.All}
          onClick={() => onSelect(CourseCategoryFilter.All)}
        >
          {t('admin.courses.filter.all', { count: allCount })}
        </Chip>
      )}
      {COURSE_CATEGORIES.map((category) => (
        <Chip
          key={category}
          selected={value === category}
          onClick={() => onSelect(category)}
          className={styles.chip}
        >
          <CategoryIcon category={category} />
          <span>{t('course.category', { category })}</span>
          {counts && <span className={styles.count}>({counts[category]})</span>}
        </Chip>
      ))}
    </div>
  )
}
