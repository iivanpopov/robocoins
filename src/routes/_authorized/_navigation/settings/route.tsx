import { TranslateProvider } from '@kanjou/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import messages from 'virtual:kanjou/uk/settings'

export const Route = createFileRoute('/_authorized/_navigation/settings')({
  component: SettingsTranslationLayout,
})

function SettingsTranslationLayout() {
  return (
    <TranslateProvider messages={messages}>
      <Outlet />
    </TranslateProvider>
  )
}
