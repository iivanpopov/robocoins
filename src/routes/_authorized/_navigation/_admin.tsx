import { createFileRoute, redirect } from '@tanstack/react-router'

import { getHomePath } from '#/routes/-utils'

export const Route = createFileRoute('/_authorized/_navigation/_admin')({
  beforeLoad: ({ context }) => {
    if (!context.user?.role) return
    if (context.user.role === 'admin') return

    throw redirect({ to: getHomePath(context.user.role) })
  },
})
