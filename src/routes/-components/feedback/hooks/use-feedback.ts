import { useState } from 'react'
import type { SyntheticEvent } from 'react'

import { useForm } from '#/hooks/use-form'

import { FEEDBACK_DEFAULT_KIND, FEEDBACK_SOURCE_KINDS, type FeedbackSource } from '../constants'
import { FeedbackFormSchema } from '../schemas'

export interface UseFeedbackOptions {
  source: FeedbackSource
}

export function useFeedback(options: UseFeedbackOptions) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm({
    initialValues: {
      kind: FEEDBACK_DEFAULT_KIND[options.source],
      message: '',
    },
    schema: FeedbackFormSchema,
    validateOn: 'submit',
  })

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()
    void form.handleSubmit()
  }

  return {
    state: {
      isOpen,
      kindChoices: FEEDBACK_SOURCE_KINDS[options.source],
    },
    functions: {
      handleOpenChange: setIsOpen,
      handleSubmit,
    },
    features: {
      form,
    },
  }
}
