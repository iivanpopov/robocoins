import { useTranslate } from '@kanjou/react'

import type { CourseCategoryKey } from '#/api/types'

export interface RewardCategoryNameProps {
  category: CourseCategoryKey | null
  className?: string
}

export function RewardCategoryName({ category, className }: RewardCategoryNameProps) {
  const t = useTranslate()

  return (
    <span className={className}>
      {!category && t('admin.catalog.category.none')}
      {!!category && category === 'no category' && t('admin.catalog.category.none')}
      {!!category && category !== 'no category' && t('course.category', { category })}
    </span>
  )
}
