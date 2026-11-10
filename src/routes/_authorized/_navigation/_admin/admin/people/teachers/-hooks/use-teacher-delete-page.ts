import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import * as v from 'valibot'

import { useField } from '#/hooks/use-field'

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

  const confirmationField = useField('', {
    customValidate: (value) => {
      const result = v.safeParse(DeleteTeacherStateSchema.entries.confirmation, value)
      if (!result.success) return 'invalid'
      if (!teacherData.state.isAvailable) return 'unavailable'
      if (result.output !== teacherData.state.name) return 'mismatch'
      return undefined
    },
    onSubmit: (value) => {
      if (!teacherData.state.isAvailable || isDeletedLocally) return
      if (value.trim() !== teacherData.state.name) return
      setIsDialogOpen(true)
    },
  })

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!teacherData.state.isAvailable || isDeletedLocally) return
    void confirmationField.handleSubmit()
  }

  function handleDialogOpenChange(isOpen: boolean) {
    setIsDialogOpen(isOpen)
  }

  function handleConfirmDelete() {
    if (!teacherData.state.isAvailable || isDeletedLocally) return
    setIsDialogOpen(false)
    setIsDeletedLocally(true)
  }

  const confirmation = confirmationField.value

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
    features: { confirmationField },
  }
}
