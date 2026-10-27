import { useForm, useSelector } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useAssignGroupTeachersGroupIdGroupIdTeachersPut } from '#/api/hooks/useAssignGroupTeachersGroupIdGroupIdTeachersPut'

import { useGroupRecord, useTeacherOptions } from '../../../-hooks'
import { GroupTeacherAssignmentStateSchema } from '../../../-schemas'
import type { GroupErrorKey, TeacherOption } from '../../../-types'
import {
  getGroupErrorKey,
  getGroupErrorStatus,
  getTeacherAssignmentErrorKey,
  invalidateGroupCaches,
} from '../../../-utils'

export function useGroupTeachersPage() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/teachers/',
  })

  const groupId = params.groupId

  const [savedTeacherIds, setSavedTeacherIds] = useState<number[] | null>(null)
  const syncedGroupIdReference = useRef<number | null>(null)

  const queryClient = useQueryClient()

  const groupData = useGroupRecord(groupId)
  const teacherOptions = useTeacherOptions()
  const assignTeachersMutation = useAssignGroupTeachersGroupIdGroupIdTeachersPut({
    mutation: { retry: false },
  })

  const form = useForm({
    defaultValues: {
      teacherIds: [] as number[],
    },
    validators: { onChange: GroupTeacherAssignmentStateSchema },
    listeners: {
      onChange: () => assignTeachersMutation.reset(),
    },
    onSubmit: async ({ value }) => {
      if (assignTeachersMutation.isPending || savedTeacherIds) return
      try {
        await assignTeachersMutation.mutateAsync({
          path: { group_id: groupId },
          body: { teacher_ids: value.teacherIds },
        })
        setSavedTeacherIds(value.teacherIds)
        await invalidateGroupCaches(queryClient).catch(() => undefined)
      } catch {
        return
      }
    },
  })

  const isFormSubmitting = useSelector(form.store, (state) => state.isSubmitting)

  useEffect(() => {
    const group = groupData.group
    if (!group) return
    if (syncedGroupIdReference.current === group.id) return
    syncedGroupIdReference.current = group.id
    form.setFieldValue('teacherIds', group.teacher_ids ?? [])
  }, [groupData.group, form])

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    if (assignTeachersMutation.isPending || savedTeacherIds) return
    void form.handleSubmit()
  }

  function handleRetry() {
    if (groupData.groupQuery.isFetching) return
    void groupData.groupQuery.refetch()
  }

  function handleRetryTeachers() {
    if (teacherOptions.isFetching) return
    void teacherOptions.usersQuery.refetch()
  }

  const groupTeacherIds = groupData.group?.teacher_ids ?? []
  const missingTeacherOptions: TeacherOption[] = groupTeacherIds.flatMap((userId) => {
    if (teacherOptions.options.some((option) => option.userId === userId)) return []
    return [{ userId, name: null }]
  })
  const pickerOptions = [...missingTeacherOptions, ...teacherOptions.options]
  const teacherNameById = new Map(
    pickerOptions.map((option) => [option.userId, option.name] as const),
  )
  const savedTeacherNames = (savedTeacherIds ?? []).map(
    (userId) => teacherNameById.get(userId) ?? null,
  )

  const isNotFound = getGroupErrorStatus(groupData.groupQuery.error) === 404
  const hasReadError = (groupData.groupQuery.isError && !isNotFound) || teacherOptions.isError

  let errorKey: GroupErrorKey | null = null
  if (groupData.groupQuery.isError && !isNotFound) {
    errorKey = getGroupErrorKey(groupData.groupQuery.error, 'admin.groups.detail.error')
  }
  if (teacherOptions.isError) {
    errorKey = getGroupErrorKey(teacherOptions.usersQuery.error, 'admin.groups.teachers.read')
  }

  let mutationErrorKey: GroupErrorKey | null = null
  if (assignTeachersMutation.isError) {
    mutationErrorKey = getTeacherAssignmentErrorKey(
      assignTeachersMutation.error,
      'admin.groups.teachers.error',
    )
  }

  return {
    state: {
      groupId,
      group: groupData.group,
      pickerOptions,
      savedTeacherIds,
      savedTeacherNames,
      errorKey,
      mutationErrorKey,
      isNotFound,
      hasReadError,
      isPending: groupData.groupQuery.isPending || teacherOptions.isPending,
      isError: hasReadError,
      isFetching: groupData.groupQuery.isFetching || teacherOptions.isFetching,
      isTeachersFetching: teacherOptions.isFetching,
      isSubmitting: assignTeachersMutation.isPending || isFormSubmitting,
      isReady: !!groupData.group && !hasReadError && !teacherOptions.isError,
    },
    queries: {
      group: groupData.groupQuery,
      users: teacherOptions.usersQuery,
    },
    mutations: { assignTeachers: assignTeachersMutation },
    functions: { handleSubmit, handleRetry, handleRetryTeachers },
    features: { form },
  }
}
