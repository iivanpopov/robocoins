import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { useField } from '#/hooks/use-field'

import { RenameCategoryStateSchema } from '../-schemas'

export function useCategoryRenamePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/categories/$category/rename/',
  })

  const category = params.category

  const [renamedName, setRenamedName] = useState<string | null>(null)

  const nameField = useField('', {
    schema: RenameCategoryStateSchema.entries.name,
    onSubmit: (value) => {
      if (renamedName) return
      setRenamedName(value.trim())
    },
  })

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (renamedName) return
    void nameField.handleSubmit()
  }

  return {
    state: {
      category,
      renamedName,
    },
    functions: { handleSubmit },
    features: { nameField },
  }
}
