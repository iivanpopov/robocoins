import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useField } from '#/hooks/use-field'

import { RenameTeacherStateSchema } from '../-schemas'
import { useTeacherRecord } from './use-teacher-record'

export function useTeacherRenamePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/teachers/$userId/rename/',
  })

  const teacherId = params.userId

  const [renamedName, setRenamedName] = useState<string | null>(null)
  const syncedTeacherIdReference = useRef<number | null>(null)

  const teacherData = useTeacherRecord(teacherId)

  const nameField = useField('', {
    schema: RenameTeacherStateSchema.entries.name,
    onSubmit: (value) => {
      if (!teacherData.state.isAvailable || renamedName) return
      setRenamedName(value.trim())
    },
  })

  useEffect(() => {
    if (!teacherData.state.isAvailable) return
    if (syncedTeacherIdReference.current === teacherId) return
    syncedTeacherIdReference.current = teacherId
    nameField.setValue(teacherData.state.name)
  }, [nameField, teacherData.state.isAvailable, teacherData.state.name, teacherId])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!teacherData.state.isAvailable || renamedName) return
    void nameField.handleSubmit()
  }

  const proposedName = nameField.value
  const isUnchanged =
    teacherData.state.isAvailable && proposedName.trim() === teacherData.state.name

  return {
    state: {
      ...teacherData.state,
      proposedName,
      renamedName,
      isUnchanged,
    },
    queries: teacherData.queries,
    functions: {
      handleSubmit,
      handleRetry: teacherData.functions.handleRetry,
    },
    features: { nameField },
  }
}
