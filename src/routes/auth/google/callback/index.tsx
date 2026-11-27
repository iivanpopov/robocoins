import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { Loader } from '#/components/ui'

import { useGoogleCallbackPage } from './-hooks'

export const Route = createFileRoute('/auth/google/callback/')({
  headers: () => ({ 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer' }),
  head: () => ({ meta: [{ name: 'referrer', content: 'no-referrer' }] }),
  component: GoogleCallbackPage,
})

function GoogleCallbackPage() {
  useGoogleCallbackPage()

  const t = useTranslate()

  return (
    <main className="grid h-full place-content-center">
      <div role="status" className="flex items-center gap-2">
        <Loader />
        {t('google.callback.loading')}
      </div>
    </main>
  )
}
