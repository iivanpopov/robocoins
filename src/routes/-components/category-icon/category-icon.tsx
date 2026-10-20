import { cn } from 'cn'

import type { CourseCategoryKey } from '#/api/types'

const CATEGORY_ICON: Record<CourseCategoryKey, string> = {
  'game dev': 'i-ph:game-controller-duotone',
  embedded: 'i-ph:cpu',
  'no category': 'i-ph:shapes-duotone',
  primary: 'i-ph:rocket-launch-duotone',
  python: 'i-ph:file-py-duotone',
  web: 'i-ph:globe-duotone',
}

export interface CategoryIconProps {
  category: CourseCategoryKey
  className?: string
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  return <div className={cn(CATEGORY_ICON[category], className)} />
}
