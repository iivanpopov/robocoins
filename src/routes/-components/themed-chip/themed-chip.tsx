import type { CourseCategoryKey } from '#/api/types'
import { Chip, type ChipProps } from '#/components/ui'

import { CategoryIcon } from '../category-icon'

export type ThemedChipType = 'default' | 'category' | 'course' | 'reward' | 'privilege'

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
      {icon && type === 'reward' && <span aria-hidden="true" className="i-ph:cube-duotone" />}
      {icon && type === 'privilege' && <span aria-hidden="true" className="i-ph:star-four-fill" />}
      {children}
    </Chip>
  )
}
