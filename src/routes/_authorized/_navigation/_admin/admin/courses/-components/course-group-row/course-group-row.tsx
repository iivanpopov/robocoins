import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import type { CourseCategoryKey, CourseGroupResponse } from '#/api/types'
import { LearningCard } from '#/routes/-components'

export interface CourseGroupRowProps {
  group: CourseGroupResponse
  category?: CourseCategoryKey
  className?: string
}

export function CourseGroupRow({ group, category, className }: CourseGroupRowProps) {
  const t = useTranslate()

  return (
    <LearningCard.Root className={className}>
      <LearningCard.Row
        render={
          <Link
            to="/admin/groups/$groupId"
            params={{ groupId: group.id }}
            aria-label={t('admin.groups.open', { name: group.name })}
          />
        }
      >
        {!!category && <LearningCard.Icon category={category} />}
        <LearningCard.Content>
          <LearningCard.Title>{group.name}</LearningCard.Title>
        </LearningCard.Content>
        <LearningCard.Indicator kind="navigate" />
      </LearningCard.Row>
    </LearningCard.Root>
  )
}
