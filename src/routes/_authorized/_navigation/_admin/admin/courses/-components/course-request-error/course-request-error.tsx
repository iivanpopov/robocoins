import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { Button } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import type { CourseErrorKey } from '../../-types'

import styles from './course-request-error.module.css'

export interface CourseRequestErrorProps {
  messageKey: CourseErrorKey
  onRetry?: () => void
  isRetrying?: boolean
  className?: string
}

export function CourseRequestError({
  messageKey,
  onRetry,
  isRetrying,
  className,
}: CourseRequestErrorProps) {
  const t = useTranslate()

  return (
    <div className={cn(styles.wrapper, className)}>
      <InlineError onRetry={onRetry} isRetrying={isRetrying}>
        {t(messageKey)}
      </InlineError>
      {messageKey === 'admin.courses.error.unauthorized' && (
        <Button
          variant="link"
          nativeButton={false}
          render={<Link to="/login" />}
          className={styles.login}
        >
          {t('admin.courses.error.login')}
        </Button>
      )}
    </div>
  )
}
