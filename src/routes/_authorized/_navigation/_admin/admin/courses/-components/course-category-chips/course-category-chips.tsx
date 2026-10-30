import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import type { CourseCategoryKey } from '#/api/types'
import { ThemedChip } from '#/routes/-components'

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
        <ThemedChip
          icon={false}
          selected={value === CourseCategoryFilter.All}
          onClick={() => onSelect(CourseCategoryFilter.All)}
        >
          {t('admin.courses.filter.all', { count: allCount })}
        </ThemedChip>
      )}
      {COURSE_CATEGORIES.map((category) => (
        <ThemedChip
          key={category}
          type="category"
          value={category}
          className={styles.chip}
          selected={value === category}
          onClick={() => onSelect(category)}
        >
          {t('course.category', { category })}
          {counts && <span className={styles.count}>({counts[category]})</span>}
        </ThemedChip>
      ))}
    </div>
  )
}
