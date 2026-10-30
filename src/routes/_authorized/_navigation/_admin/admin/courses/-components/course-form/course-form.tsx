import { cn } from 'cn'
import type { FormEvent, ReactNode } from 'react'

import { Button, Loader } from '#/components/ui'

import styles from './course-form.module.css'

export interface CourseFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  submitLabel: string
  isSubmitting?: boolean
  submitDisabled?: boolean
  submitClassName?: string
  children: ReactNode
  className?: string
}

export function CourseForm({
  onSubmit,
  submitLabel,
  isSubmitting,
  submitDisabled,
  submitClassName,
  children,
  className,
}: CourseFormProps) {
  return (
    <form className={cn(styles.form, className)} onSubmit={onSubmit} noValidate>
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
