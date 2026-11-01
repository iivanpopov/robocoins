import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import messages from 'virtual:messages/uk/admin'

import { TranslationProvider } from '#/lib/translations'
import { getHomePath } from '#/routes/-utils'

export const Route = createFileRoute('/_authorized/_navigation/_admin')({
  component: AdminTranslationLayout,
  beforeLoad: ({ context }) => {
    if (!context.user?.role) return
    if (context.user.role === 'admin') return

    throw redirect({ to: getHomePath(context.user.role) })
  },
})

function AdminTranslationLayout() {
  return (
    <TranslationProvider messages={messages} omitLeadingCoinZero>
      <Outlet />
    </TranslationProvider>
  )
}
