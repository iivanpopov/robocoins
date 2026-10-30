import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { UserCard } from '#/routes/-components'

export interface StudentRowData {
  id: number
  name: string
  avatar?: string | null
  courseNames: string[]
}

export interface StudentRowProps {
  student: StudentRowData
}

export function StudentRow({ student }: StudentRowProps) {
  const t = useTranslate()

  return (
    <UserCard.Root
      render={<Link to="/admin/people/students/$studentId" params={{ studentId: student.id }} />}
    >
      <UserCard.Avatar name={student.name} avatar={student.avatar} />
      <UserCard.Content>
        <UserCard.Name>{student.name}</UserCard.Name>
        {!!student.courseNames.length && (
          <UserCard.Description>{student.courseNames.join(', ')}</UserCard.Description>
        )}
        {!student.courseNames.length && (
          <UserCard.Description>{t('students.no-groups')}</UserCard.Description>
        )}
      </UserCard.Content>
      <UserCard.Indicator />
    </UserCard.Root>
  )
}
