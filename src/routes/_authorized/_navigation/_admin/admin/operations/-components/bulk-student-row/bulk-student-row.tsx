import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Checkbox } from '#/components/ui'

import styles from './bulk-student-row.module.css'

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
    <div className={cn(styles.row, selected && styles.selected)}>
      <Checkbox
        id={checkboxId}
        size="lg"
        checked={selected}
        disabled={disabled}
        onCheckedChange={(checked) => onToggle(student.id, checked)}
      />
      <label className={styles.label} htmlFor={checkboxId}>
        <span className={styles.name}>{student.name}</span>
        <span className={styles.balance}>
          {t('admin.balance.coins', { count: student.balance })}
        </span>
      </label>
    </div>
  )
}
