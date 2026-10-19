import { createFileRoute, redirect } from '@tanstack/react-router'

import { LOCALSTORAGE_DID_REGISTER } from './-constants'

export const Route = createFileRoute('/_student')({
  beforeLoad: async ({ context }) => {
    const user = await context.user

    if (user?.role === 'teacher') throw redirect({ to: '/group' })
    if (user?.role === 'student') return { user }

    const to = localStorage.getItem(LOCALSTORAGE_DID_REGISTER) ? '/login' : '/register'
    throw redirect({ to })
  },
})
