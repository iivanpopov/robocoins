import { useForm } from '@tanstack/react-form'
import { useHydrated } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'

import { useLoginAuthLoginPost } from '#/api/hooks/useLoginAuthLoginPost'
import { getHomePath } from '#/routes/-utils'

import { LoginStateSchema } from '../-schemas'

export function useLoginPage() {
  const isHydrated = useHydrated()

  const loginMutation = useLoginAuthLoginPost()

  const form = useForm({
    defaultValues: { password: '' },
    validators: { onChange: LoginStateSchema },
    listeners: {
      onChange: () => loginMutation.reset(),
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await loginMutation.mutateAsync({ body: { code: value.password } })
        window.location.assign(getHomePath(response.user.role))
      } catch {
        return
      }
    },
  })

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    void form.handleSubmit()
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
      form,
    },
  }
}
