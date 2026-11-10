import { useNavigate } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'

import { useField } from '#/hooks/use-field'
import { RegisterStep } from '#/routes/_auth/register/-constants'

import { useRegisterDraft } from '../../../register-provider'
import { StepNameFormSchema } from '../schemas'

export function useStepName() {
  const register = useRegisterDraft()

  const navigate = useNavigate({ from: '/register' })

  const nameField = useField(register.state.name ?? '', {
    schema: StepNameFormSchema.entries.name,
    onSubmit: async (value) => {
      await register.setState({ name: value.trim() })
      await navigate({
        search: { step: RegisterStep.Category },
        viewTransition: { types: ['slide-forward'] },
      })
    },
  })

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    void nameField.handleSubmit()
  }

  return {
    functions: {
      handleSubmit,
    },
    features: {
      nameField,
    },
  }
}
