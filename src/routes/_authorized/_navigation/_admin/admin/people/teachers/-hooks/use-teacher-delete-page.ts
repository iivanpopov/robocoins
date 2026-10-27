import { useForm, useSelector } from '@tanstack/react-form'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import * as v from 'valibot'

import { DeleteTeacherStateSchema } from '../-schemas'
import { useTeacherRecord } from './use-teacher-record'

export function useTeacherDeletePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/teachers/$userId/delete/',
  })

  const teacherId = params.userId

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeletedLocally, setIsDeletedLocally] = useState(false)

  const teacherData = useTeacherRecord(teacherId)

  const form = useForm({
    defaultValues: { confirmation: '' },
    validators: {
      onChange: ({ value }) => {
        const result = v.safeParse(DeleteTeacherStateSchema, value)
        if (!result.success) return 'invalid'
        if (!teacherData.state.isAvailable) return 'unavailable'
        if (result.output.confirmation !== teacherData.state.name) return 'mismatch'
        return undefined
      },
    },
    onSubmit: ({ value }) => {
      if (!teacherData.state.isAvailable || isDeletedLocally) return
      if (value.confirmation.trim() !== teacherData.state.name) return
      setIsDialogOpen(true)
    },
  })

  const confirmation = useSelector(form.store, (state) => state.values.confirmation)

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!teacherData.state.isAvailable || isDeletedLocally) return
    void form.handleSubmit()
  }

  function handleDialogOpenChange(isOpen: boolean) {
    setIsDialogOpen(isOpen)
  }

  function handleConfirmDelete() {
    if (!teacherData.state.isAvailable || isDeletedLocally) return
    setIsDialogOpen(false)
    setIsDeletedLocally(true)
  }

  return {
    state: {
      ...teacherData.state,
      confirmation,
      isDialogOpen,
      isDeletedLocally,
    },
    queries: teacherData.queries,
    functions: {
      handleSubmit,
      handleDialogOpenChange,
      handleConfirmDelete,
      handleRetry: teacherData.functions.handleRetry,
    },
    features: { form },
  }
}
