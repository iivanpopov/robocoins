import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { Button } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import styles from './student-request-error.module.css'

export interface StudentRequestErrorProps {
  status: number | null
  message: string
  forbiddenMessage?: string
  notFoundMessage?: string
  onRetry?: () => void
  isRetrying?: boolean
  className?: string
}

export function StudentRequestError({
  status,
  message,
  forbiddenMessage,
  notFoundMessage,
  onRetry,
  isRetrying,
  className,
}: StudentRequestErrorProps) {
  const t = useTranslate()

  return (
    <div className={cn(styles.wrapper, className)}>
      <InlineError onRetry={onRetry} isRetrying={isRetrying}>
        {status === 401 && t('students.error.session')}
        {status === 403 && (forbiddenMessage ?? t('students.error.forbidden'))}
        {status === 404 && (notFoundMessage ?? t('students.manage.not-found'))}
        {status !== 401 && status !== 403 && status !== 404 && message}
      </InlineError>
      {status === 401 && (
        <Button
          variant="link"
          nativeButton={false}
          render={<Link to="/login" />}
          className={styles.login}
        >
          {t('students.action.login')}
        </Button>
      )}
    </div>
  )
}
