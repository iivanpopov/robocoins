import { cn } from 'cn'
import { ComponentProps, useMemo } from 'react'

import styles from './field.module.css'

export interface FieldProps extends ComponentProps<'div'> {
  orientation?: 'vertical' | 'horizontal'
}

export function Field({ orientation = 'vertical', className, ...props }: FieldProps) {
  return (
    <div
      {...props}
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(styles.field, styles[orientation], className)}
    />
  )
}

export function FieldGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} data-slot="field-group" className={cn(styles.group, className)} />
}

export function FieldSet({ className, ...props }: ComponentProps<'fieldset'>) {
  return <fieldset {...props} data-slot="field-set" className={cn(styles.set, className)} />
}

export interface FieldLegendProps extends ComponentProps<'legend'> {
  variant?: 'legend' | 'label'
}

export function FieldLegend({ variant = 'legend', className, ...props }: FieldLegendProps) {
  return (
    <legend
      {...props}
      data-slot="field-legend"
      data-variant={variant}
      className={cn(styles.legend, styles[variant], className)}
    />
  )
}

export function FieldLabel({ className, ...props }: ComponentProps<'label'>) {
  return <label {...props} data-slot="field-label" className={cn(styles.label, className)} />
}

export function FieldTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} data-slot="field-title" className={cn(styles.title, className)} />
}

export function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p {...props} data-slot="field-description" className={cn(styles.description, className)} />
  )
}

export interface FieldErrorProps extends ComponentProps<'div'> {
  errors?: Array<{ message?: string } | undefined>
}

export function FieldError({ className, children, errors, ...props }: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) return children
    if (!errors?.length) return null

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()]

    if (uniqueErrors.length === 1) return uniqueErrors[0]?.message

    return (
      <ul className={styles['error-list']}>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={`${error.message}-${index}`}>{error.message}</li>,
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) return null

  return (
    <div {...props} role="alert" data-slot="field-error" className={cn(styles.error, className)}>
      {content}
    </div>
  )
}
