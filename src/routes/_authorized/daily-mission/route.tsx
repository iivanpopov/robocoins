import { TranslateProvider } from '@kanjou/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import messages from 'virtual:kanjou/uk/student'

export const Route = createFileRoute('/_authorized/daily-mission')({
  component: DailyMissionTranslationLayout,
})

function DailyMissionTranslationLayout() {
  return (
    <TranslateProvider messages={messages}>
      <Outlet />
    </TranslateProvider>
  )
}
