import { useTranslate } from '@kanjou/react'
import { useForm } from '@tanstack/react-form'
import type { SyntheticEvent } from 'react'

import { useLoginAuthLoginPost } from '#/api/hooks/useLoginAuthLoginPost'
import { toast } from '#/components/ui/toast'

import { LoginStateSchema } from '../-schemas'

const HOME_PATH_BY_ROLE = {
  student: '/',
  teacher: '/group',
} as const

export function useLoginPage() {
  const t = useTranslate()

  const loginMutation = useLoginAuthLoginPost()

  const form = useForm({
    defaultValues: { password: '' },
    validators: { onChange: LoginStateSchema },
    onSubmit: async ({ value }) => {
      try {
        const response = await loginMutation.mutateAsync({ body: { code: value.password } })
        window.location.assign(HOME_PATH_BY_ROLE[response.user.role])
      } catch {
        toast.add({ title: t('error.incorrect-password'), type: 'error', timeout: 0 })
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
