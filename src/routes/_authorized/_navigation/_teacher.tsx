import { TranslateProvider } from '@kanjou/react'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import messages from 'virtual:kanjou/uk/teacher'

import { getHomePath } from '#/routes/-utils'

export const Route = createFileRoute('/_authorized/_navigation/_teacher')({
  component: TeacherTranslationLayout,
  beforeLoad: ({ context }) => {
    if (!context.user?.role) return
    if (context.user.role === 'teacher') return

    throw redirect({ to: getHomePath(context.user.role) })
  },
})

function TeacherTranslationLayout() {
  return (
    <TranslateProvider messages={messages}>
      <Outlet />
    </TranslateProvider>
  )
}
