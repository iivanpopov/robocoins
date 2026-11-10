import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { useField } from '#/hooks/use-field'

import { CreateCategoryStateSchema } from '../-schemas'

export function useCategoryCreatePage() {
  const [createdName, setCreatedName] = useState<string | null>(null)

  const nameField = useField('', {
    schema: CreateCategoryStateSchema.entries.name,
    onSubmit: (value) => {
      if (createdName) return
      setCreatedName(value.trim())
    },
  })

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (createdName) return
    void nameField.handleSubmit()
  }

  function handleCreateAnother() {
    setCreatedName(null)
    nameField.reset()
  }

  return {
    state: { createdName },
    functions: {
      handleSubmit,
      handleCreateAnother,
    },
    features: { nameField },
  }
}
