import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { useId, useState } from 'react'

import {
  Checkbox,
  Field,
  FieldDescription,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '#/components/ui'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'

import styles from './group-selection-list.module.css'

export interface BulkGroupTeacher {
  userId: number
  name: string | null
}

export interface BulkGroupOption {
  id: number
  name: string
  courseName: string
  teachers: BulkGroupTeacher[]
}

export interface GroupSelectionListProps {
  groups: BulkGroupOption[]
  selectedIds: number[]
  onChange: (groupIds: number[]) => void
  label: string
  disabled?: boolean
  className?: string
}

export function GroupSelectionList({
  groups,
  selectedIds,
  onChange,
  label,
  disabled,
  className,
}: GroupSelectionListProps) {
  const t = useTranslate()

  const [query, setQuery] = useState('')

  const labelId = useId()
  const searchId = useId()

  function handleToggle(groupId: number, checked: boolean | 'indeterminate') {
    if (disabled) return
    if (checked === true) {
      if (selectedIds.includes(groupId)) return
      onChange([...selectedIds, groupId])
      return
    }
    onChange(selectedIds.filter((selectedId) => selectedId !== groupId))
  }

  const normalizedQuery = query.trim().toLocaleLowerCase(UKRAINIAN_LOCALE)
  const filteredGroups = groups.filter((group) => {
    if (!normalizedQuery) return true
    if (group.name.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery)) return true
    if (group.courseName.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery)) return true
    return group.teachers.some((teacher) => {
      if (!teacher.name) return false
      return teacher.name.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery)
    })
  })

  return (
    <Field className={cn(styles.list, className)} aria-labelledby={labelId}>
      <div className={styles.header}>
        <span id={labelId} className={styles.title}>
          {label}
        </span>
        <span className={styles.count}>
          {t('admin.groups.bulk.groups.selected', { count: selectedIds.length })}
        </span>
      </div>

      <label className={styles['search-label']} htmlFor={searchId}>
        {t('admin.groups.bulk.groups.search-label')}
      </label>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <span aria-hidden="true" className="i-ph:magnifying-glass" />
        </InputGroupAddon>
        <InputGroupInput
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('admin.groups.bulk.groups.search-placeholder')}
          autoComplete="off"
          disabled={disabled}
        />
      </InputGroup>

      {!filteredGroups.length && (
        <p className={styles.empty}>{t('admin.groups.bulk.groups.search-empty')}</p>
      )}
      {!!filteredGroups.length && (
        <div className={styles.options}>
          {filteredGroups.map((group) => {
            const isSelected = selectedIds.includes(group.id)
            const optionId = `${searchId}-group-${group.id}`
            const teacherNames = group.teachers.map(
              (teacher) =>
                teacher.name ?? t('admin.groups.teacher-unknown', { id: teacher.userId }),
            )
            return (
              <Field key={group.id} orientation="horizontal" className={styles.option}>
                <Checkbox
                  id={optionId}
                  checked={isSelected}
                  disabled={disabled}
                  onCheckedChange={(checked) => handleToggle(group.id, checked)}
                />
                <FieldLabel htmlFor={optionId} className={styles['option-label']}>
                  <span className={styles.name}>{group.name}</span>
                  <span className={styles.course}>{group.courseName}</span>
                  <span className={styles.teachers}>
                    {!!teacherNames.length && <>{teacherNames.join(', ')}</>}
                    {!teacherNames.length && <>{t('admin.groups.bulk.groups.no-teachers')}</>}
                  </span>
                </FieldLabel>
              </Field>
            )
          })}
        </div>
      )}

      <FieldDescription>{t('admin.groups.bulk.groups.hint')}</FieldDescription>
    </Field>
  )
}
