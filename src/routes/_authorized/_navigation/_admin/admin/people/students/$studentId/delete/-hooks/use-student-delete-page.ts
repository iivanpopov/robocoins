import { useForm, useSelector } from '@tanstack/react-form'
import { useNavigate, useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import * as v from 'valibot'

import { useGetStudentByIdStudentStudentIdGet } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'

import { DeleteStudentStateSchema } from '../../-schemas'
import { getRequestErrorStatus } from '../../-utils'

export function useStudentDeletePage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/delete/',
  })

  const studentId = Number(params.studentId)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeletedLocally, setIsDeletedLocally] = useState(false)

  const studentQuery = useGetStudentByIdStudentStudentIdGet({
    path: { student_id: studentId },
  })

  const form = useForm({
    defaultValues: { confirmation: '' },
    validators: {
      onChange: ({ value }) => {
        const result = v.safeParse(DeleteStudentStateSchema, value)
        if (!result.success) return 'invalid'
        if (!studentQuery.data) return 'unavailable'
        if (result.output.confirmation !== studentQuery.data.name) return 'mismatch'
        return undefined
      },
    },
    onSubmit: ({ value }) => {
      if (!studentQuery.data || isDeletedLocally) return
      if (value.confirmation.trim() !== studentQuery.data.name) return
      setIsDialogOpen(true)
    },
  })

  const confirmation = useSelector(form.store, (state) => state.values.confirmation)

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!studentQuery.data || isDeletedLocally) return
    void form.handleSubmit()
  }

  function handleDialogOpenChange(isOpen: boolean) {
    if (isDeletedLocally) return
    setIsDialogOpen(isOpen)
  }

  function handleConfirmDelete() {
    if (!studentQuery.data || isDeletedLocally) return
    setIsDialogOpen(false)
    setIsDeletedLocally(true)
  }

  function handleResetResult() {
    form.reset()
    setIsDeletedLocally(false)
  }

  function handleRetry() {
    if (studentQuery.isFetching) return
    void studentQuery.refetch()
  }

  function handleBack() {
    void navigate({
      to: '/admin/people/students/$studentId',
      params: { studentId },
    })
  }

  const student = studentQuery.data ?? null
  const canConfirm = !!student && !!confirmation.trim() && confirmation.trim() === student.name

  return {
    state: {
      studentId,
      student,
      confirmation,
      canConfirm,
      isDialogOpen,
      isDeletedLocally,
      isPending: studentQuery.isPending,
      isError: studentQuery.isError,
      isFetching: studentQuery.isFetching,
      errorStatus: getRequestErrorStatus(studentQuery.error),
    },
    queries: { student: studentQuery },
    functions: {
      handleSubmit,
      handleDialogOpenChange,
      handleConfirmDelete,
      handleResetResult,
      handleRetry,
      handleBack,
    },
    features: { form },
  }
}
