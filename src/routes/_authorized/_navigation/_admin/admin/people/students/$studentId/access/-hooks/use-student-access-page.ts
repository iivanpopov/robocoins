import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetStudentByIdStudentStudentIdGet } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { useRegenarateStudentAccessCodeStudentStudentIdAccessCodePatch } from '#/api/hooks/useRegenarateStudentAccessCodeStudentStudentIdAccessCodePatch'
import {
  showStudentCredentialsStudentStudentIdCredentialsGetQueryKey,
  useShowStudentCredentialsStudentStudentIdCredentialsGet,
} from '#/api/hooks/useShowStudentCredentialsStudentStudentIdCredentialsGet'

import { getRequestErrorStatus } from '../../-utils'
import { useCopyAccessCode } from './use-copy-access-code'

export function useStudentAccessPage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/access/',
  })
  const queryClient = useQueryClient()

  const studentId = Number(params.studentId)

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false)
  const [isRevokedLocally, setIsRevokedLocally] = useState(false)

  const studentQuery = useGetStudentByIdStudentStudentIdGet({
    path: { student_id: studentId },
  })

  const credentialsQuery = useShowStudentCredentialsStudentStudentIdCredentialsGet(
    { path: { student_id: studentId } },
    {
      query: {
        retry: false,
        staleTime: 0,
        meta: { expectedErrorStatuses: [403, 422] },
      },
    },
  )

  const resetMutation = useRegenarateStudentAccessCodeStudentStudentIdAccessCodePatch({
    mutation: {
      retry: false,
      meta: { expectedErrorStatuses: [403, 422] },
      onSuccess: (data, variables) => {
        queryClient.setQueryData(
          showStudentCredentialsStudentStudentIdCredentialsGetQueryKey({ path: variables.path }),
          data,
        )
      },
    },
  })

  const code = resetMutation.data?.access_code ?? credentialsQuery.data?.access_code ?? ''
  const clipboard = useCopyAccessCode(code)

  function handleBack() {
    void navigate({
      to: '/admin/people/students/$studentId',
      params: { studentId },
    })
  }

  function handleRetryStudent() {
    if (studentQuery.isFetching) return
    void studentQuery.refetch()
  }

  function handleRetryCredentials() {
    if (credentialsQuery.isFetching) return
    void credentialsQuery.refetch()
  }

  function handleOpenResetDialog() {
    if (resetMutation.isPending || !credentialsQuery.data) return
    resetMutation.reset()
    setIsResetDialogOpen(true)
  }

  function handleResetDialogOpenChange(isOpen: boolean) {
    if (resetMutation.isPending) return
    setIsResetDialogOpen(isOpen)
  }

  function handleConfirmReset() {
    if (resetMutation.isPending || !studentQuery.data) return
    setIsResetDialogOpen(false)
    resetMutation.mutate({ path: { student_id: studentId } })
  }

  function handleRetryReset() {
    if (resetMutation.isPending) return
    handleOpenResetDialog()
  }

  function handleOpenRevokeDialog() {
    if (!studentQuery.data) return
    setIsRevokeDialogOpen(true)
  }

  function handleRevokeDialogOpenChange(isOpen: boolean) {
    setIsRevokeDialogOpen(isOpen)
  }

  function handleConfirmRevoke() {
    if (!studentQuery.data) return
    setIsRevokeDialogOpen(false)
    setIsRevokedLocally(true)
  }

  function handleResetRevokeResult() {
    setIsRevokedLocally(false)
  }

  const student = studentQuery.data ?? null
  const credentials = credentialsQuery.data ?? null

  return {
    state: {
      studentId,
      student,
      name: student?.name ?? credentials?.name ?? '',
      code,
      isResetDialogOpen,
      isRevokeDialogOpen,
      isRevokedLocally,
      isPending: studentQuery.isPending,
      isError: studentQuery.isError,
      isFetching: studentQuery.isFetching,
      errorStatus: getRequestErrorStatus(studentQuery.error),
      isCredentialsPending: credentialsQuery.isPending,
      isCredentialsError: credentialsQuery.isError,
      isCredentialsFetching: credentialsQuery.isFetching,
      credentialsErrorStatus: getRequestErrorStatus(credentialsQuery.error),
      resetErrorStatus: getRequestErrorStatus(resetMutation.error),
    },
    queries: { student: studentQuery, credentials: credentialsQuery },
    mutations: { reset: resetMutation },
    functions: {
      handleBack,
      handleRetryStudent,
      handleRetryCredentials,
      handleOpenResetDialog,
      handleResetDialogOpenChange,
      handleConfirmReset,
      handleRetryReset,
      handleOpenRevokeDialog,
      handleRevokeDialogOpenChange,
      handleConfirmRevoke,
      handleResetRevokeResult,
    },
    features: { clipboard },
  }
}
