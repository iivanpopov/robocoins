import { useForm, useSelector } from '@tanstack/react-form'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

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

  const form = useForm({
    defaultValues: { name: '' },
    validators: { onChange: RenameTeacherStateSchema },
    onSubmit: ({ value }) => {
      if (!teacherData.state.isAvailable || renamedName) return
      setRenamedName(value.name.trim())
    },
  })

  const proposedName = useSelector(form.store, (state) => state.values.name)

  useEffect(() => {
    if (!teacherData.state.isAvailable) return
    if (syncedTeacherIdReference.current === teacherId) return
    syncedTeacherIdReference.current = teacherId
    form.setFieldValue('name', teacherData.state.name)
  }, [form, teacherData.state.isAvailable, teacherData.state.name, teacherId])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!teacherData.state.isAvailable || renamedName) return
    void form.handleSubmit()
  }

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
    features: { form },
  }
}
