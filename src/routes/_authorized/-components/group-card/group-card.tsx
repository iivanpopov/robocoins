import { useTranslate } from '@kanjou/react'
import type { ReactNode } from 'react'

import type { CourseCategoryKey } from '#/api/types'
import { LearningCard, type LearningCardRowProps } from '#/routes/-components'
import type { Weekday } from '#/routes/-constants'

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
  actions?: ReactNode
  render?: LearningCardRowProps['render']
}

export function GroupCard({ group, className, actions, render }: GroupCardProps) {
  const t = useTranslate()

  return (
    <LearningCard.Root className={className}>
      <LearningCard.Row render={render}>
        <LearningCard.Icon category={group.category} />
        <LearningCard.Content>
          <LearningCard.Title>{group.courseName}</LearningCard.Title>
          <LearningCard.Description>
            {group.schedule.weekday && <>{t.unsafe(`weekday.${group.schedule.weekday}`)}</>}
            {group.schedule.weekday && group.schedule.time && ', '}
            {group.schedule.time}
          </LearningCard.Description>
        </LearningCard.Content>
        {group.studentsCount !== undefined && (
          <LearningCard.Meta>
            {t('group.students-count', { count: group.studentsCount })}
          </LearningCard.Meta>
        )}
      </LearningCard.Row>
      {actions && <LearningCard.Actions>{actions}</LearningCard.Actions>}
    </LearningCard.Root>
  )
}
