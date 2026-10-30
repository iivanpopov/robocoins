import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { UserCard } from '#/routes/-components'

export interface TeacherRowData {
  userId: number
  name: string
}

export interface TeacherRowProps {
  teacher: TeacherRowData
}

export function TeacherRow({ teacher }: TeacherRowProps) {
  const t = useTranslate()

  return (
    <UserCard.Root
      render={
        <Link
          to="/admin/people/teachers/$userId"
          params={{ userId: teacher.userId }}
          aria-label={t('profile.open-label', { name: teacher.name })}
        />
      }
    >
      <UserCard.Avatar name={teacher.name} />
      <UserCard.Content>
        <UserCard.Name>{teacher.name}</UserCard.Name>
        <UserCard.Description>{t('role.teacher')}</UserCard.Description>
      </UserCard.Content>
      <UserCard.Indicator />
    </UserCard.Root>
  )
}
