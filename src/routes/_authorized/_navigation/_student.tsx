import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import messages from 'virtual:messages/uk/student'

import { TranslationProvider } from '#/lib/translations'
import { getHomePath } from '#/routes/-utils'

export const Route = createFileRoute('/_authorized/_navigation/_student')({
  component: StudentTranslationLayout,
  beforeLoad: ({ context }) => {
    if (!context.user?.role) return
    if (context.user.role === 'student') return

    throw redirect({ to: getHomePath(context.user.role) })
  },
})

function StudentTranslationLayout() {
  return (
    <TranslationProvider messages={messages}>
      <Outlet />
    </TranslationProvider>
  )
}
