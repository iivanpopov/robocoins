import { TranslateProvider } from '@kanjou/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import messages from 'virtual:kanjou/uk/student'

export const Route = createFileRoute('/_authorized/student')({
  component: StudentProfileTranslationLayout,
})

function StudentProfileTranslationLayout() {
  return (
    <TranslateProvider messages={messages}>
      <Outlet />
    </TranslateProvider>
  )
}
