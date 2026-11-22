import { TranslateProvider } from '@kanjou/react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import messages from 'virtual:kanjou/uk/student'

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
    <TranslateProvider messages={messages}>
      <Outlet />
    </TranslateProvider>
  )
}
