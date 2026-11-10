import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import * as v from 'valibot'

import { useField } from '#/hooks/use-field'

import { DeleteGroupStateSchema } from '../-schemas'
import type { GroupErrorKey } from '../-types'
import { getGroupErrorKey, getGroupErrorStatus } from '../-utils'
import { useGroupRecord } from './use-group-record'

export function useGroupDeletePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/delete/',
  })

  const groupId = params.groupId

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeletedLocally, setIsDeletedLocally] = useState(false)

  const groupData = useGroupRecord(groupId)

  const confirmationField = useField('', {
    customValidate: (value) => {
      const result = v.safeParse(DeleteGroupStateSchema.entries.confirmation, value)
      if (!result.success) return 'invalid'
      if (!groupData.group) return 'unavailable'
      if (result.output !== groupData.group.name) return 'mismatch'
      return undefined
    },
    onSubmit: (value) => {
      if (!groupData.group || isDeletedLocally) return
      if (value.trim() !== groupData.group.name) return
      setIsDialogOpen(true)
    },
  })

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!groupData.group || isDeletedLocally) return
    void confirmationField.handleSubmit()
  }

  function handleDialogOpenChange(isOpen: boolean) {
    setIsDialogOpen(isOpen)
  }

  function handleConfirmDelete() {
    if (isDeletedLocally) return
    setIsDialogOpen(false)
    setIsDeletedLocally(true)
  }

  function handleRetry() {
    if (groupData.groupQuery.isFetching) return
    void groupData.groupQuery.refetch()
  }

  const isNotFound = getGroupErrorStatus(groupData.groupQuery.error) === 404

  let errorKey: GroupErrorKey | null = null
  if (!isNotFound && groupData.groupQuery.isError) {
    errorKey = getGroupErrorKey(groupData.groupQuery.error, 'admin.groups.detail.error')
  }

  return {
    state: {
      groupId,
      group: groupData.group,
      isDialogOpen,
      isDeletedLocally,
      errorKey,
      isNotFound,
      isPending: groupData.groupQuery.isPending,
      isError: !!errorKey,
      isFetching: groupData.groupQuery.isFetching,
    },
    queries: { group: groupData.groupQuery },
    functions: {
      handleSubmit,
      handleDialogOpenChange,
      handleConfirmDelete,
      handleRetry,
    },
    features: { confirmationField },
  }
}
