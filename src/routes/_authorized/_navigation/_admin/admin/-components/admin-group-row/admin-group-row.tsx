import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import type { CourseCategoryKey } from '#/api/types'
import { LearningCard } from '#/routes/-components'

export interface AdminGroupRowTeacher {
  userId: number
  name: string | null
}

export interface AdminGroupRowData {
  id: number
  name: string
  courseName: string
  category: CourseCategoryKey
  studentsCount: number
  teachers: AdminGroupRowTeacher[]
}

export interface AdminGroupRowProps {
  group: AdminGroupRowData
  className?: string
}

export function AdminGroupRow({ group, className }: AdminGroupRowProps) {
  const t = useTranslate()

  const teacherNames = group.teachers.flatMap((teacher) => {
    if (!teacher.name) return []
    return [teacher.name]
  })
  const teacherLabel = teacherNames.join(', ')

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
        <LearningCard.Icon category={group.category} />
        <LearningCard.Content>
          <LearningCard.Title>{group.name}</LearningCard.Title>
          <LearningCard.Description>{group.courseName}</LearningCard.Description>
          <LearningCard.Description>
            {!!teacherLabel && teacherLabel}
            {!teacherLabel && t('admin.groups.no-teacher')}
          </LearningCard.Description>
        </LearningCard.Content>
        <LearningCard.Meta>
          <span>{t('group.students-count', { count: group.studentsCount })}</span>
          <LearningCard.Indicator kind="navigate" />
        </LearningCard.Meta>
      </LearningCard.Row>
    </LearningCard.Root>
  )
}
