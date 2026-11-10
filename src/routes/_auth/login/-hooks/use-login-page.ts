import { useHydrated } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'

import { useLoginAuthLoginPost } from '#/api/hooks/useLoginAuthLoginPost'
import { useField } from '#/hooks/use-field'
import { getHomePath } from '#/routes/-utils'

import { LoginStateSchema } from '../-schemas'

export function useLoginPage() {
  const isHydrated = useHydrated()

  const loginMutation = useLoginAuthLoginPost()

  const passwordField = useField('', {
    schema: LoginStateSchema.entries.password,
    onChange: () => loginMutation.reset(),
    onSubmit: async (value) => {
      try {
        const response = await loginMutation.mutateAsync({ body: { code: value } })
        window.location.assign(getHomePath(response.user.role))
      } catch {
        return
      }
    },
  })

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    void passwordField.handleSubmit()
  }

  return {
    state: { isHydrated },
    mutations: {
      login: loginMutation,
    },
    functions: {
      handleSubmit,
    },
    features: {
      passwordField,
    },
  }
}
