import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import type { CourseResponse } from '#/api/types'
import { LearningCard } from '#/routes/-components'

export interface CourseRowProps {
  course: CourseResponse
  className?: string
}

export function CourseRow({ course, className }: CourseRowProps) {
  const t = useTranslate()

  const groupsCount = course.groups_count ?? course.groups?.length ?? 0
  const groupNames = (course.groups ?? []).map((group) => group.name).join(', ')

  return (
    <LearningCard.Root className={className}>
      <LearningCard.Row
        render={<Link to="/admin/courses/$courseId" params={{ courseId: course.id }} />}
      >
        <LearningCard.Icon category={course.category} />
        <LearningCard.Content>
          <LearningCard.Title>{course.name}</LearningCard.Title>
          <LearningCard.Description>
            {t('course.category', { category: course.category })}
          </LearningCard.Description>
          {!!groupNames && <LearningCard.Description>{groupNames}</LearningCard.Description>}
        </LearningCard.Content>
        <LearningCard.Meta>
          <span>{t('groups.count', { count: groupsCount })}</span>
          <LearningCard.Indicator kind="navigate" />
        </LearningCard.Meta>
      </LearningCard.Row>
    </LearningCard.Root>
  )
}
