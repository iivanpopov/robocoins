import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import styles from './practice-group-option.module.css'

export interface PracticeGroupOptionData {
  id: number
  name: string
  courseName: string
  studentsCount: number
}

export interface PracticeGroupOptionProps {
  group: PracticeGroupOptionData
  selected: boolean
  disabled: boolean
  onSelect: (groupId: number) => void
}

export function PracticeGroupOption({
  group,
  selected,
  disabled,
  onSelect,
}: PracticeGroupOptionProps) {
  const t = useTranslate()

  return (
    <button
      type="button"
      className={cn(styles.option, selected && styles.selected)}
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelect(group.id)}
    >
      <span className={styles.copy}>
        <span className={styles.course}>{group.courseName}</span>
        <span className={styles.name}>{group.name}</span>
        <span className={styles.count}>
          {t('group.students-count', { count: group.studentsCount })}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn('i-ph:check-circle-bold', styles.check, !selected && styles['check-hidden'])}
      />
    </button>
  )
}
