import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import messages from 'virtual:messages/uk/teacher'

import { TranslationProvider } from '#/lib/translations'
import { getHomePath } from '#/routes/-utils'

export const Route = createFileRoute('/_authorized/_teacher')({
  component: TeacherTranslationLayout,
  beforeLoad: ({ context }) => {
    if (!context.user?.role) return
    if (context.user.role === 'teacher') return

    throw redirect({ to: getHomePath(context.user.role) })
  },
})

function TeacherTranslationLayout() {
  return (
    <TranslationProvider messages={messages}>
      <Outlet />
    </TranslationProvider>
  )
}
