import { useForm } from '@tanstack/react-form'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { CreateCategoryStateSchema } from '../-schemas'

export function useCategoryCreatePage() {
  const [createdName, setCreatedName] = useState<string | null>(null)

  const form = useForm({
    defaultValues: { name: '' },
    validators: { onChange: CreateCategoryStateSchema },
    onSubmit: ({ value }) => {
      if (createdName) return
      setCreatedName(value.name.trim())
    },
  })

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (createdName) return
    void form.handleSubmit()
  }

  function handleCreateAnother() {
    setCreatedName(null)
    form.reset()
  }

  return {
    state: { createdName },
    functions: {
      handleSubmit,
      handleCreateAnother,
    },
    features: { form },
  }
}
