import { createFileRoute, redirect } from '@tanstack/react-router'

import { sessionQueryOptions } from '#/lib/session'

import { LOCALSTORAGE_DID_REGISTER } from './-constants'

export const Route = createFileRoute('/_teacher')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery(sessionQueryOptions)

    if (user?.role === 'student') throw redirect({ to: '/' })
    if (user?.role === 'teacher') return { user }

    const to = localStorage.getItem(LOCALSTORAGE_DID_REGISTER) ? '/login' : '/register'
    throw redirect({ to })
  },
})
