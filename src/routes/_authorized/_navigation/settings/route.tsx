import { createFileRoute, Outlet } from '@tanstack/react-router'
import messages from 'virtual:messages/uk/settings'

import { TranslationProvider } from '#/lib/translations'

export const Route = createFileRoute('/_authorized/_navigation/settings')({
  component: SettingsTranslationLayout,
})

function SettingsTranslationLayout() {
  return (
    <TranslationProvider messages={messages}>
      <Outlet />
    </TranslationProvider>
  )
}
