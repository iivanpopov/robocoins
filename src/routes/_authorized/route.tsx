import { createFileRoute, redirect } from '@tanstack/react-router'

import { querySession } from '#/routes/-actions/get-session'
import { RequestErrorComponent } from '#/routes/-components/request-error-component'
import { readCookie } from '#/utils/cookies'

import { DID_REGISTER_COOKIE } from '../-constants'

export const Route = createFileRoute('/_authorized')({
  beforeLoad: async (match) => {
    const user = await querySession(match.context.queryClient)
    if (user) return { user }

    let to: '/login' | '/register' = '/register'
    if (readCookie(DID_REGISTER_COOKIE)) to = '/login'
    throw redirect({ to })
  },
  errorComponent: RequestErrorComponent,
})
