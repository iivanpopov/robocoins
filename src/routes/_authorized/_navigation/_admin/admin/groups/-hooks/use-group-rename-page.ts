import { useForm, useSelector } from '@tanstack/react-form'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

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

  const form = useForm({
    defaultValues: { name: groupData.group?.name ?? '' },
    validators: { onChange: RenameGroupStateSchema },
    onSubmit: ({ value }) => {
      if (!groupData.group || renamedName) return
      setRenamedName(value.name.trim())
    },
  })

  const name = useSelector(form.store, (state) => state.values.name)

  useEffect(() => {
    const group = groupData.group
    if (!group) return
    if (syncedGroupIdReference.current === group.id) return
    syncedGroupIdReference.current = group.id
    form.setFieldValue('name', group.name)
  }, [groupData.group, form])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!groupData.group || renamedName) return
    void form.handleSubmit()
  }

  function handleRetry() {
    if (groupData.groupQuery.isFetching) return
    void groupData.groupQuery.refetch()
  }

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
    features: { form },
  }
}
