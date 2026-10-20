import { useForm } from '@tanstack/react-form'
import type { SyntheticEvent } from 'react'

import { useLoginAuthLoginPost } from '#/api/hooks/useLoginAuthLoginPost'

import { LoginStateSchema } from '../-schemas'

const HOME_PATH_BY_ROLE = {
  student: '/',
  teacher: '/group',
} as const

export function useLoginPage() {
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
        window.location.assign(HOME_PATH_BY_ROLE[response.user.role])
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
