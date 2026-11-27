import { useTranslate } from '@kanjou/react'

import { Button } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import type { ApiErrorKind } from '../../-utils'

import styles from './api-error-notice.module.css'

export interface ApiErrorNoticeProps {
  kind: ApiErrorKind
  fallback: string
  onLogin: () => void
  onRetry?: () => void
  isRetrying?: boolean
}

export function ApiErrorNotice(props: ApiErrorNoticeProps) {
  const t = useTranslate()

  const isSessionError = props.kind === 'session'
  const isOtherError = props.kind === 'other'

  let message = props.fallback
  if (isSessionError) message = t('error.session')
  if (props.kind === 'forbidden') message = t('error.forbidden')

  return (
    <div className={styles.notice}>
      <InlineError {...(isOtherError && { onRetry: props.onRetry, isRetrying: props.isRetrying })}>
        {message}
      </InlineError>
      {isSessionError && (
        <Button type="button" variant="ghost" onClick={props.onLogin}>
          {t('navigation.login')}
        </Button>
      )}
    </div>
  )
}
