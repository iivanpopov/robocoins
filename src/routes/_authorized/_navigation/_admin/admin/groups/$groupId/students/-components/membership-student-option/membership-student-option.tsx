import { cn } from 'cn'

import { Avatar, AvatarFallback, AvatarImage, Checkbox } from '#/components/ui'
import { AVATARS } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

import type { MembershipStudentCandidate } from '../../../../../-types'

import styles from './membership-student-option.module.css'

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
  const knownAvatar = AVATARS.find((avatar) => avatar === student.avatar)

  function handleCheckedChange(value: boolean | 'indeterminate') {
    onCheckedChange(student.id, value === true)
  }

  return (
    <div className={cn(styles.row, checked && styles.selected)}>
      <Checkbox
        id={id}
        size="lg"
        checked={checked}
        disabled={disabled}
        onCheckedChange={handleCheckedChange}
      />
      <Avatar>
        {knownAvatar && <AvatarImage src={getAvatarUrl(knownAvatar)} alt="" aria-hidden="true" />}
        <AvatarFallback role="img" aria-label={student.name}>
          {getInitial(student.name)}
        </AvatarFallback>
      </Avatar>
      <label htmlFor={id} className={styles.copy}>
        <span className={styles.name}>{student.name}</span>
        {meta && <span className={styles.meta}>{meta}</span>}
      </label>
    </div>
  )
}
