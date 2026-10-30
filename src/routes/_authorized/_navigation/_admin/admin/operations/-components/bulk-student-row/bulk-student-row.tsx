import { useTranslate } from '@kanjou/react'

import { Checkbox } from '#/components/ui'
import { UserCard } from '#/routes/-components'

export interface BulkStudentRowData {
  id: number
  name: string
  balance: number
}

export interface BulkStudentRowProps {
  student: BulkStudentRowData
  selected: boolean
  disabled: boolean
  onToggle: (studentId: number, selected: boolean) => void
}

export function BulkStudentRow({ student, selected, disabled, onToggle }: BulkStudentRowProps) {
  const t = useTranslate()

  const checkboxId = `operations-student-${student.id}`

  return (
    <UserCard.Root selected={selected}>
      <Checkbox
        id={checkboxId}
        size="lg"
        checked={selected}
        disabled={disabled}
        onCheckedChange={(checked) => onToggle(student.id, checked)}
      />
      <UserCard.Avatar name={student.name} />
      <UserCard.Content render={<label htmlFor={checkboxId} />}>
        <UserCard.Name>{student.name}</UserCard.Name>
        <UserCard.Description>{t('coins.unit', { count: student.balance })}</UserCard.Description>
      </UserCard.Content>
    </UserCard.Root>
  )
}
