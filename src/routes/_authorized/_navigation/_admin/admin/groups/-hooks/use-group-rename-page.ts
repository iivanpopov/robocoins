import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useField } from '#/hooks/use-field'

import { RenameGroupStateSchema } from '../-schemas'
import type { GroupErrorKey } from '../-types'
import { getGroupErrorKey, getGroupErrorStatus } from '../-utils'
import { useGroupRecord } from './use-group-record'

export function useGroupRenamePage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/rename/',
  })

  const groupId = params.groupId

  const [renamedName, setRenamedName] = useState<string | null>(null)
  const syncedGroupIdReference = useRef<number | null>(null)

  const groupData = useGroupRecord(groupId)

  const nameField = useField(groupData.group?.name ?? '', {
    schema: RenameGroupStateSchema.entries.name,
    onSubmit: (value) => {
      if (!groupData.group || renamedName) return
      setRenamedName(value.trim())
    },
  })

  useEffect(() => {
    const group = groupData.group
    if (!group) return
    if (syncedGroupIdReference.current === group.id) return
    syncedGroupIdReference.current = group.id
    nameField.setValue(group.name)
  }, [groupData.group, nameField])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!groupData.group || renamedName) return
    void nameField.handleSubmit()
  }

  function handleRetry() {
    if (groupData.groupQuery.isFetching) return
    void groupData.groupQuery.refetch()
  }

  const name = nameField.value
  const isUnchanged = !!groupData.group && name.trim() === groupData.group.name
  const isNotFound = getGroupErrorStatus(groupData.groupQuery.error) === 404

  let errorKey: GroupErrorKey | null = null
  if (!isNotFound && groupData.groupQuery.isError) {
    errorKey = getGroupErrorKey(groupData.groupQuery.error, 'admin.groups.detail.error')
  }

  return {
    state: {
      groupId,
      group: groupData.group,
      renamedName,
      isUnchanged,
      errorKey,
      isNotFound,
      isPending: groupData.groupQuery.isPending,
      isError: !!errorKey,
      isFetching: groupData.groupQuery.isFetching,
    },
    queries: { group: groupData.groupQuery },
    functions: { handleSubmit, handleRetry },
    features: { nameField },
  }
}
