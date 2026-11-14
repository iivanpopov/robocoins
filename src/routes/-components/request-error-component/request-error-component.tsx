import { useTranslate } from '@kanjou/react'

import { InlineError } from '../inline-error'
import { PageLayout } from '../page-layout'

export function RequestErrorComponent() {
  const t = useTranslate()

  function handleRetry() {
    window.location.reload()
  }

  return (
    <PageLayout.Root variant="comfortable">
      <PageLayout.Header>
        <PageLayout.Heading>
          <PageLayout.Title>{t('error.title')}</PageLayout.Title>
        </PageLayout.Heading>
      </PageLayout.Header>
      <InlineError onRetry={handleRetry}>{t('error.description')}</InlineError>
    </PageLayout.Root>
  )
}
