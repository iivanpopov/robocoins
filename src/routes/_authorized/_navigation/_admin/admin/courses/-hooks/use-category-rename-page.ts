import { useForm } from '@tanstack/react-form'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'

import { RenameCategoryStateSchema } from '../-schemas'

export function useCategoryRenamePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/categories/$category/rename/',
  })

  const category = params.category

  const [renamedName, setRenamedName] = useState<string | null>(null)

  const form = useForm({
    defaultValues: { name: '' },
    validators: { onChange: RenameCategoryStateSchema },
    onSubmit: ({ value }) => {
      if (renamedName) return
      setRenamedName(value.name.trim())
    },
  })

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (renamedName) return
    void form.handleSubmit()
  }

  return {
    state: {
      category,
      renamedName,
    },
    functions: { handleSubmit },
    features: { form },
  }
}
