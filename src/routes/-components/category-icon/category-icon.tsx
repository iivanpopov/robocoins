import { cn } from 'cn'

import type { CourseCategoryKey } from '#/api/types'

const CATEGORY_ICON: Record<CourseCategoryKey, string> = {
  'game dev': 'i-ph:game-controller',
  embedded: 'i-ph:cpu',
  'no category': 'i-ph:shapes',
  primary: 'i-ph:rocket-launch',
  python: 'i-ph:file-py',
  web: 'i-ph:globe',
}

export interface CategoryIconProps {
  category: CourseCategoryKey
  className?: string
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  return <span className={cn(CATEGORY_ICON[category], className)} />
}
