import { createFileRoute, redirect } from '@tanstack/react-router'

import { querySession } from '#/routes/-actions/get-session'
import { RequestErrorComponent } from '#/routes/-components/request-error-component'
import { readExpiringStorage } from '#/utils/storage'

import { DID_REGISTER_STORAGE_KEY } from '../-constants'

export const Route = createFileRoute('/_authorized')({
  beforeLoad: async (match) => {
    const user = await querySession(match.context.queryClient)
    if (user) return { user }

    let to: '/login' | '/register' = '/register'
    if (readExpiringStorage(DID_REGISTER_STORAGE_KEY) === true) to = '/login'
    throw redirect({ to })
  },
  errorComponent: RequestErrorComponent,
})
