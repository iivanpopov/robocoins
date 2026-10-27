import type { CourseCategoryKey } from '#/api/types'
import { Chip, type ChipProps } from '#/components/ui'

import { CategoryIcon } from '../category-icon'

export type ThemedChipType = 'default' | 'category' | 'course'

export interface ThemedChipProps extends Omit<ChipProps, 'type'> {
  type?: ThemedChipType
  icon?: boolean
  category?: CourseCategoryKey
  value?: string | number
}

export function ThemedChip({
  type = 'default',
  icon = true,
  category,
  value,
  children,
  ...props
}: ThemedChipProps) {
  const resolvedCategory =
    category ??
    (type === 'category' && typeof value === 'string' ? (value as CourseCategoryKey) : undefined)

  return (
    <Chip {...props} type="button">
      {icon && !!resolvedCategory && <CategoryIcon category={resolvedCategory} />}
      {children}
    </Chip>
  )
}
