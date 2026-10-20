import { createFileRoute, redirect } from '@tanstack/react-router'

import { readCookie } from '#/utils/cookies'

import { DID_REGISTER_COOKIE } from './-constants'

export const Route = createFileRoute('/_authorized')({
  beforeLoad: async ({ context }) => {
    if (context.user) return

    let to: '/login' | '/register' = '/register'
    if (await readCookie(DID_REGISTER_COOKIE)) to = '/login'
    throw redirect({ to })
  },
})
