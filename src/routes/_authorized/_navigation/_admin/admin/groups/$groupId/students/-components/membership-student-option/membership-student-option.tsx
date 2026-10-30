import { Checkbox } from '#/components/ui'
import { UserCard } from '#/routes/-components'

import type { MembershipStudentCandidate } from '../../../../../-types'

export interface MembershipStudentOptionProps {
  id: string
  student: MembershipStudentCandidate
  checked: boolean
  disabled?: boolean
  meta?: string
  onCheckedChange: (studentId: number, checked: boolean) => void
}

export function MembershipStudentOption({
  id,
  student,
  checked,
  disabled,
  meta,
  onCheckedChange,
}: MembershipStudentOptionProps) {
  function handleCheckedChange(value: boolean | 'indeterminate') {
    onCheckedChange(student.id, value === true)
  }

  return (
    <UserCard.Root selected={checked}>
      <Checkbox
        id={id}
        size="lg"
        checked={checked}
        disabled={disabled}
        onCheckedChange={handleCheckedChange}
      />
      <UserCard.Avatar name={student.name} avatar={student.avatar} />
      <UserCard.Content render={<label htmlFor={id} />}>
        <UserCard.Name>{student.name}</UserCard.Name>
        {meta && <UserCard.Description>{meta}</UserCard.Description>}
      </UserCard.Content>
    </UserCard.Root>
  )
}
