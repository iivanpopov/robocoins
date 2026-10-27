import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { useId, useState } from 'react'

import {
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'
import { getInitial } from '#/routes/-utils'

import type { TeacherOption } from '../../-types'
import { TEACHER_ASSIGNMENT_MAX } from '../../../-constants'

import styles from './teacher-picker.module.css'

export interface TeacherPickerProps {
  options: TeacherOption[]
  selectedIds: number[]
  onChange: (teacherIds: number[]) => void
  label: string
  disabled?: boolean
  isPending?: boolean
  isError?: boolean
  isRetrying?: boolean
  onRetry?: () => void
  isInvalid?: boolean
  className?: string
}

export function TeacherPicker({
  options,
  selectedIds,
  onChange,
  label,
  disabled,
  isPending,
  isError,
  isRetrying,
  onRetry,
  isInvalid,
  className,
}: TeacherPickerProps) {
  const t = useTranslate()

  const [query, setQuery] = useState('')

  const labelId = useId()
  const searchId = useId()

  function handleToggle(userId: number, checked: boolean | 'indeterminate') {
    if (disabled) return
    if (checked === true) {
      if (selectedIds.includes(userId) || selectedIds.length >= TEACHER_ASSIGNMENT_MAX) return
      onChange([...selectedIds, userId])
      return
    }
    onChange(selectedIds.filter((teacherId) => teacherId !== userId))
  }

  const normalizedQuery = query.trim().toLocaleLowerCase(UKRAINIAN_LOCALE)
  const filteredOptions = options.filter((option) => {
    if (!normalizedQuery) return true
    if (option.name?.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery)) return true
    return String(option.userId).includes(normalizedQuery)
  })

  return (
    <Field className={cn(styles.picker, className)} aria-labelledby={labelId}>
      <div className={styles.header}>
        <span id={labelId} className={styles.title}>
          {label}
        </span>
        <span className={styles.count}>
          {t('admin.groups.teachers.picker.selected', { count: selectedIds.length })}
        </span>
      </div>

      <label className={styles['search-label']} htmlFor={searchId}>
        {t('admin.groups.teachers.picker.search-label')}
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
          placeholder={t('admin.groups.teachers.picker.search-placeholder')}
          autoComplete="off"
          disabled={disabled}
        />
      </InputGroup>

      {isPending && <Loader />}
      {isError && (
        <InlineError onRetry={onRetry} isRetrying={isRetrying}>
          {t('admin.groups.teachers.picker.error')}
        </InlineError>
      )}
      {!isPending && !isError && !options.length && (
        <p className={styles.empty}>{t('admin.groups.teachers.picker.empty')}</p>
      )}
      {!isPending && !isError && !!options.length && !filteredOptions.length && (
        <p className={styles.empty}>{t('admin.groups.teachers.picker.search-empty')}</p>
      )}
      {!isPending && !isError && !!filteredOptions.length && (
        <div className={styles.options}>
          {filteredOptions.map((option) => {
            const isSelected = selectedIds.includes(option.userId)
            const isLimited = !isSelected && selectedIds.length >= TEACHER_ASSIGNMENT_MAX
            const optionId = `${searchId}-teacher-${option.userId}`
            const optionName =
              option.name ?? t('admin.groups.teacher-unknown', { id: option.userId })
            return (
              <Field key={option.userId} orientation="horizontal" className={styles.option}>
                <span className={styles.avatar} aria-hidden="true">
                  {getInitial(optionName)}
                </span>
                <FieldLabel htmlFor={optionId} className={styles['option-label']}>
                  <span className={styles.name}>{optionName}</span>
                  <span className={styles.role}>{t('role.teacher')}</span>
                </FieldLabel>
                <Checkbox
                  id={optionId}
                  checked={isSelected}
                  disabled={disabled || isLimited}
                  onCheckedChange={(checked) => handleToggle(option.userId, checked)}
                />
              </Field>
            )
          })}
        </div>
      )}

      <FieldDescription>{t('admin.groups.teachers.picker.limit')}</FieldDescription>
      {isInvalid && <FieldError>{t('admin.groups.teachers.picker.validation')}</FieldError>}
    </Field>
  )
}
