import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'

import { useForm } from '#/hooks/use-form'

import { submitFeedback } from '../actions'
import {
  FEEDBACK_DEFAULT_KIND,
  FEEDBACK_ERROR_KEYS,
  FEEDBACK_SOURCE_KINDS,
  type FeedbackErrorLocaleKey,
  type FeedbackSource,
} from '../constants'
import { FeedbackFormSchema } from '../schemas'
import type { FeedbackSubmissionInput, FeedbackSubmissionResult } from '../types'

export interface UseFeedbackOptions {
  source: FeedbackSource
}

export function useFeedback(options: UseFeedbackOptions) {
  const source = options.source

  const [isOpen, setIsOpen] = useState(false)
  const attempt = useRef<{ id: string; signature: string } | null>(null)

  const submitMutation = useMutation<FeedbackSubmissionResult, Error, FeedbackSubmissionInput>({
    mutationFn: (input) => submitFeedback({ data: input }),
    retry: false,
  })

  const form = useForm({
    initialValues: {
      kind: FEEDBACK_DEFAULT_KIND[source],
      message: '',
    },
    schema: FeedbackFormSchema,
    validateOn: 'submit',
    onSubmit: async (value) => {
      if (submitMutation.isPending) return

      const message = value.message.trim()
      const signature = `${source}\u0000${value.kind}\u0000${message}`
      if (!attempt.current || attempt.current.signature !== signature) {
        attempt.current = { id: crypto.randomUUID(), signature }
      }

      try {
        const result = await submitMutation.mutateAsync({
          id: attempt.current.id,
          source,
          kind: value.kind,
          message,
        })
        if (!result.ok) {
          if (result.error === 'conflict') attempt.current = null
          return
        }
        attempt.current = null
      } catch {
        return
      }
    },
  })

  const isFormSubmitting = form.state.isSubmitting

  function handleOpenChange(open: boolean) {
    if (isFormSubmitting || submitMutation.isPending) return

    if (open && submitMutation.data?.ok) {
      submitMutation.reset()
      form.reset()
      attempt.current = null
    }

    setIsOpen(open)
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()
    if (isFormSubmitting || submitMutation.isPending || submitMutation.data?.ok) return
    void form.handleSubmit()
  }

  function handleResetSubmission() {
    if (isFormSubmitting || submitMutation.isPending) return
    if (!submitMutation.data && !submitMutation.isError) return
    submitMutation.reset()
  }

  const errorCode = submitMutation.data?.ok === false ? submitMutation.data.error : null
  const errorKey: FeedbackErrorLocaleKey | null = errorCode
    ? (FEEDBACK_ERROR_KEYS[errorCode] ?? 'feedback.error.generic')
    : submitMutation.isError
      ? 'feedback.error.generic'
      : null

  return {
    state: {
      isOpen,
      isSuccess: submitMutation.data?.ok === true,
      isSubmitting: isFormSubmitting || submitMutation.isPending,
      errorKey,
      kindChoices: FEEDBACK_SOURCE_KINDS[source],
    },
    mutations: {
      submit: submitMutation,
    },
    functions: {
      handleOpenChange,
      handleSubmit,
      handleResetSubmission,
    },
    features: {
      form,
    },
  }
}
