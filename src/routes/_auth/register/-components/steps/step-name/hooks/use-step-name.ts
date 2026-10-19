import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'

import { RegisterStep } from '#/routes/_auth/register/-constants'

import { StepNameForm } from '../-schemas'
import { useRegisterContext } from '../../../register-provider'

export function useStepName() {
  const register = useRegisterContext()

  const navigate = useNavigate({ from: '/register' })

  const form = useForm({
    defaultValues: { name: register.state.name ?? '' },
    validators: { onChange: StepNameForm },
    onSubmit: ({ value }) => {
      register.setState({ name: value.name.trim() })
      void navigate({ search: { step: RegisterStep.Course } })
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
