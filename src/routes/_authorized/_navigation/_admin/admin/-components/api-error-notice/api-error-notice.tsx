import { useTranslate } from '@kanjou/react'

import { Button } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import type { ApiErrorKind } from '#/routes/_authorized/_navigation/_admin/admin/-utils'

import styles from './api-error-notice.module.css'

export interface ApiErrorNoticeProps {
  kind: ApiErrorKind
  fallback: string
  onLogin: () => void
  onRetry?: () => void
  isRetrying?: boolean
}

export function ApiErrorNotice({
  kind,
  fallback,
  onLogin,
  onRetry,
  isRetrying,
}: ApiErrorNoticeProps) {
  const t = useTranslate()

  return (
    <div className={styles.notice}>
      {kind === 'session' && <InlineError>{t('error.session')}</InlineError>}
      {kind === 'forbidden' && <InlineError>{t('error.forbidden')}</InlineError>}
      {kind === 'other' && (
        <InlineError onRetry={onRetry} isRetrying={isRetrying}>
          {fallback}
        </InlineError>
      )}
      {kind === 'session' && (
        <Button variant="ghost" onClick={onLogin}>
          {t('navigation.login')}
        </Button>
      )}
    </div>
  )
}
