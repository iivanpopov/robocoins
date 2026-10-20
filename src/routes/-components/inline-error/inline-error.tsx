import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'
import { ComponentProps } from 'react'

import { Button } from '#/components/ui'

import styles from './inline-error.module.css'

export interface InlineErrorProps extends ComponentProps<'div'> {
  onRetry?: () => void
  isRetrying?: boolean
}

export function InlineError({
  onRetry,
  isRetrying,
  className,
  children,
  ...props
}: InlineErrorProps) {
  const t = useTranslate()

  return (
    <div {...props} className={cn(styles.error, className)}>
      <span role="alert">{children}</span>
      {onRetry && (
        <Button
          type="button"
          className={styles.retry}
          variant="link"
          onClick={onRetry}
          disabled={isRetrying}
          aria-busy={isRetrying}
        >
          {t('error.retry')}
        </Button>
      )}
    </div>
  )
}
