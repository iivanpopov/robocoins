import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'

import { RegisterStep } from '#/routes/_auth/register/-constants'

import { useRegisterDraft } from '../../../register-provider'
import { StepNameFormSchema } from '../schemas'

export function useStepName() {
  const register = useRegisterDraft()

  const navigate = useNavigate({ from: '/register' })

  const form = useForm({
    defaultValues: { name: register.state.name ?? '' },
    validators: { onChange: StepNameFormSchema },
    onSubmit: async ({ value }) => {
      await register.setState({ name: value.name.trim() })
      await navigate({
        search: { step: RegisterStep.Category },
        viewTransition: { types: ['slide-forward'] },
      })
    },
  })

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    void form.handleSubmit()
  }

  return {
    functions: {
      handleSubmit,
    },
    features: {
      form,
    },
  }
}
