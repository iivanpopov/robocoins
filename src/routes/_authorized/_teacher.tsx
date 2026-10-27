import { createFileRoute, redirect } from '@tanstack/react-router'

import { getHomePath } from '#/routes/-utils'

export const Route = createFileRoute('/_authorized/_teacher')({
  beforeLoad: ({ context }) => {
    if (!context.user?.role) return
    if (context.user.role === 'teacher') return

    throw redirect({ to: getHomePath(context.user.role) })
  },
})
