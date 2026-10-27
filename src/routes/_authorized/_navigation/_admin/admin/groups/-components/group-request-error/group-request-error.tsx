import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { Button } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import type { GroupErrorKey } from '../../-types'

import styles from './group-request-error.module.css'

export interface GroupRequestErrorProps {
  messageKey: GroupErrorKey
  onRetry?: () => void
  isRetrying?: boolean
  className?: string
}

export function GroupRequestError({
  messageKey,
  onRetry,
  isRetrying,
  className,
}: GroupRequestErrorProps) {
  const t = useTranslate()

  return (
    <div className={cn(styles.wrapper, className)}>
      <InlineError onRetry={onRetry} isRetrying={isRetrying}>
        {t(messageKey)}
      </InlineError>
      {messageKey === 'admin.groups.error.unauthorized' && (
        <Button
          variant="link"
          nativeButton={false}
          render={<Link to="/login" />}
          className={styles.login}
        >
          <span aria-hidden="true" className="i-ph:sign-in" />
          {t('admin.groups.error.login')}
        </Button>
      )}
    </div>
  )
}
