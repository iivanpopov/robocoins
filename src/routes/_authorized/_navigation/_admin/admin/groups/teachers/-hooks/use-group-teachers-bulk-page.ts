import { useQueries, useQueryClient } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import { useRef, useState } from 'react'

import { useAssignGroupTeachersGroupIdGroupIdTeachersPut } from '#/api/hooks/useAssignGroupTeachersGroupIdGroupIdTeachersPut'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { getGroupsByCourseIdGroupCourseCourseIdGetQueryOptions } from '#/api/hooks/useGetGroupsByCourseIdGroupCourseCourseIdGet'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'

import type { BulkGroupOption } from '../-components'
import type { GroupTeacherBulkResult } from '../-types'
import { useTeacherOptions } from '../../-hooks'
import type { GroupErrorKey } from '../../-types'
import {
  getGroupErrorKey,
  getTeacherAssignmentErrorStatus,
  invalidateGroupCaches,
  isDefiniteTeacherAssignmentFailure,
} from '../../-utils'

export function useGroupTeachersBulkPage() {
  const search = useSearch({
    from: '/_authorized/_navigation/_admin/admin/groups/teachers/',
  })
  const queryClient = useQueryClient()

  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([])
  const [selectedTeacherIds, setSelectedTeacherIds] = useState<number[]>(() => {
    if (!search.teacherId) return []
    return [search.teacherId]
  })
  const [results, setResults] = useState<GroupTeacherBulkResult[] | null>(null)
  const [isOperating, setIsOperating] = useState(false)

  const operationTeacherIdsReference = useRef<number[]>([])
  const isOperatingReference = useRef(false)

  const coursesQuery = useGetCoursesCourseGet()
  const groupsQueries = useQueries({
    queries: (coursesQuery.data ?? []).map((course) =>
      getGroupsByCourseIdGroupCourseCourseIdGetQueryOptions({ path: { course_id: course.id } }),
    ),
  })
  const teacherOptions = useTeacherOptions()
  const assignTeachersMutation = useAssignGroupTeachersGroupIdGroupIdTeachersPut({
    mutation: { retry: false },
  })

  function createPendingResults(groupIds: number[]) {
    const groupById = new Map(allGroups.map((group) => [group.id, group] as const))
    return groupIds.flatMap((groupId) => {
      const group = groupById.get(groupId)
      if (!group) return []
      return [
        {
          groupId: group.id,
          groupName: group.name,
          courseName: group.courseName,
          status: 'pending',
          statusCode: null,
        } satisfies GroupTeacherBulkResult,
      ]
    })
  }

  function updateResult(groupId: number, result: Partial<GroupTeacherBulkResult>) {
    setResults((current) => {
      if (!current) return current
      return current.map((entry) => {
        if (entry.groupId !== groupId) return entry
        return { ...entry, ...result }
      })
    })
  }

  async function runAssignment(groupIds: number[], teacherIds: number[]) {
    if (isOperatingReference.current) return
    isOperatingReference.current = true
    setIsOperating(true)
    operationTeacherIdsReference.current = teacherIds
    try {
      setResults((current) => {
        const base = current ?? createPendingResults(groupIds)
        return base.map((entry) => {
          if (!groupIds.includes(entry.groupId)) return entry
          return { ...entry, status: 'pending', statusCode: null }
        })
      })

      const hasAttemptedGroups = !!groupIds.length

      for (const groupId of groupIds) {
        try {
          await assignTeachersMutation.mutateAsync({
            path: { group_id: groupId },
            body: { teacher_ids: teacherIds },
          })
          updateResult(groupId, { status: 'success', statusCode: null })
        } catch (error) {
          updateResult(groupId, {
            status: isDefiniteTeacherAssignmentFailure(error) ? 'error' : 'unknown',
            statusCode: getTeacherAssignmentErrorStatus(error),
          })
        }
      }

      if (hasAttemptedGroups) {
        await invalidateGroupCaches(queryClient).catch(() => undefined)
      }
    } finally {
      setIsOperating(false)
      isOperatingReference.current = false
    }
  }

  function handleGroupIdsChange(groupIds: number[]) {
    if (isOperating) return
    setSelectedGroupIds(groupIds)
    setResults(null)
  }

  function handleTeacherIdsChange(teacherIds: number[]) {
    if (isOperating) return
    setSelectedTeacherIds(teacherIds)
    setResults(null)
  }

  function handleApply() {
    if (!canSubmit) return
    void runAssignment(selectedGroupIds, selectedTeacherIds)
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    handleApply()
  }

  function handleRetryFailures() {
    if (!canRetry) return
    const failedGroupIds = (results ?? [])
      .filter((result) => result.status === 'error')
      .map((result) => result.groupId)
    void runAssignment(failedGroupIds, operationTeacherIdsReference.current)
  }

  function handleRetryRead() {
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()
    if (teacherOptions.isError && !teacherOptions.isFetching) {
      void teacherOptions.usersQuery.refetch()
    }
    groupsQueries.forEach((groupsQuery) => {
      if (groupsQuery.isError && !groupsQuery.isFetching) void groupsQuery.refetch()
    })
  }

  const teacherNameById = new Map(
    teacherOptions.options.map((option) => [option.userId, option.name] as const),
  )
  const allGroups: BulkGroupOption[] = groupsQueries
    .flatMap((groupsQuery, index) => {
      const course = coursesQuery.data?.[index]
      if (!course) return []
      return (groupsQuery.data ?? []).map((group) => {
        const teachers = (group.teacher_ids ?? []).map((userId) => ({
          userId,
          name: teacherNameById.get(userId) ?? null,
        }))
        return {
          id: group.id,
          name: group.name,
          courseName: course.name,
          teachers,
        } satisfies BulkGroupOption
      })
    })
    .toSorted((first, second) => {
      const courseOrder = first.courseName.localeCompare(second.courseName, UKRAINIAN_LOCALE)
      if (courseOrder !== 0) return courseOrder
      return first.name.localeCompare(second.name, UKRAINIAN_LOCALE)
    })

  const validTeacherIds = selectedTeacherIds.filter((teacherId) =>
    teacherOptions.options.some((option) => option.userId === teacherId),
  )

  const groupsQueryError = groupsQueries.find((groupsQuery) => groupsQuery.isError)?.error
  let errorKey: GroupErrorKey | null = null
  if (coursesQuery.isError) {
    errorKey = getGroupErrorKey(coursesQuery.error, 'admin.groups.bulk.read-error')
  }
  if (groupsQueryError) {
    errorKey = getGroupErrorKey(groupsQueryError, 'admin.groups.bulk.read-error')
  }
  if (teacherOptions.isError) {
    errorKey = getGroupErrorKey(teacherOptions.usersQuery.error, 'admin.groups.bulk.read-error')
  }

  const isPending =
    coursesQuery.isPending ||
    teacherOptions.isPending ||
    groupsQueries.some((groupsQuery) => groupsQuery.isPending)
  const isFetching =
    coursesQuery.isFetching ||
    teacherOptions.isFetching ||
    groupsQueries.some((groupsQuery) => groupsQuery.isFetching)
  const isReadError = !!errorKey
  const isTeacherSelectionValid = selectedTeacherIds.length === validTeacherIds.length
  const canSubmit =
    !!selectedGroupIds.length &&
    !results &&
    !isPending &&
    !isReadError &&
    !isOperating &&
    isTeacherSelectionValid
  const retryableResults = (results ?? []).filter((result) => result.status === 'error')
  const canRetry = !!retryableResults.length && !isOperating && !isReadError
  const submitLabelKey: 'admin.groups.bulk.submit' | 'admin.groups.bulk.submit-empty' =
    validTeacherIds.length ? 'admin.groups.bulk.submit' : 'admin.groups.bulk.submit-empty'
  let sessionErrorKey: GroupErrorKey | null = null
  if (results?.some((result) => result.statusCode === 401)) {
    sessionErrorKey = 'admin.groups.error.unauthorized'
  }
  if (results?.some((result) => result.statusCode === 403)) {
    sessionErrorKey = 'admin.groups.error.forbidden'
  }

  return {
    state: {
      groups: allGroups,
      teacherOptions: teacherOptions.options,
      selectedGroupIds,
      selectedTeacherIds: validTeacherIds,
      results,
      submitLabelKey,
      canSubmit,
      canRetry,
      sessionErrorKey,
      isOperating,
      isPending,
      isFetching,
      isError: isReadError,
      errorKey,
      hasGroups: !!allGroups.length,
    },
    queries: {
      courses: coursesQuery,
      groups: groupsQueries,
      users: teacherOptions.usersQuery,
    },
    mutations: { assignTeachers: assignTeachersMutation },
    functions: {
      handleGroupIdsChange,
      handleTeacherIdsChange,
      handleSubmit,
      handleRetryFailures,
      handleRetryRead,
    },
  }
}
