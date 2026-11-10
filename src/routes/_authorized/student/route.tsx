import { createFileRoute, Outlet } from '@tanstack/react-router'
import messages from 'virtual:messages/uk/student'

import { TranslationProvider } from '#/lib/translations'

export const Route = createFileRoute('/_authorized/student')({
  component: StudentProfileTranslationLayout,
})

function StudentProfileTranslationLayout() {
  return (
    <TranslationProvider messages={messages}>
      <Outlet />
    </TranslationProvider>
  )
}
