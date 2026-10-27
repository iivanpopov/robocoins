import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { Button } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import styles from './teacher-request-error.module.css'

export interface TeacherRequestErrorProps {
  status: number | null
  message: string
  onRetry?: () => void
  isRetrying?: boolean
  className?: string
}

export function TeacherRequestError({
  status,
  message,
  onRetry,
  isRetrying,
  className,
}: TeacherRequestErrorProps) {
  const t = useTranslate()

  return (
    <div className={cn(styles.wrapper, className)}>
      <InlineError onRetry={onRetry} isRetrying={isRetrying}>
        {status === 401 && t('admin.teachers.error.unauthorized')}
        {status === 403 && t('admin.teachers.error.forbidden')}
        {status !== 401 && status !== 403 && message}
      </InlineError>
      {status === 401 && (
        <Button
          variant="link"
          nativeButton={false}
          render={<Link to="/login" />}
          className={styles.login}
        >
          {t('admin.teachers.error.login')}
        </Button>
      )}
    </div>
  )
}
