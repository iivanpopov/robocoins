import { cn } from 'cn'
import type { FormEvent, ReactNode } from 'react'

import { Button, Loader } from '#/components/ui'

import styles from './teacher-form.module.css'

export interface TeacherFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitLabel: string
  isSubmitting?: boolean
  submitDisabled?: boolean
  submitClassName?: string
  note?: string
  children: ReactNode
  className?: string
}

export function TeacherForm({
  onSubmit,
  submitLabel,
  isSubmitting,
  submitDisabled,
  submitClassName,
  note,
  children,
  className,
}: TeacherFormProps) {
  return (
    <form className={cn(styles.form, className)} onSubmit={onSubmit} noValidate>
      {note && (
        <p className={styles.note}>
          <span aria-hidden="true" className="i-ph:info-duotone" />
          <span>{note}</span>
        </p>
      )}
      <div className={styles.fields}>{children}</div>
      <div className={styles.actions}>
        <Button
          type="submit"
          className={submitClassName}
          disabled={isSubmitting || submitDisabled}
          aria-busy={isSubmitting}
        >
          {isSubmitting && <Loader />}
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
