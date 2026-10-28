import { useTranslate } from '@kanjou/react'

import type { StudentProfileResponse } from '#/api/types'
import { UserCard } from '#/routes/-components'

export interface GroupStudentRowProps {
  student: StudentProfileResponse
  className?: string
}

export function GroupStudentRow({ student, className }: GroupStudentRowProps) {
  const t = useTranslate()

  return (
    <UserCard.Root className={className} render={<article />}>
      <UserCard.Avatar name={student.name} avatar={student.avatar} />
      <UserCard.Content>
        <UserCard.Name>{student.name}</UserCard.Name>
        <UserCard.Description>
          {t('groups.count', { count: student.group_ids.length })}
        </UserCard.Description>
      </UserCard.Content>
    </UserCard.Root>
  )
}
