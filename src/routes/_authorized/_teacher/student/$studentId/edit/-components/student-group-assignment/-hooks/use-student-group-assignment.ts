import { useTranslate } from '@kanjou/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import { useAssignGroupStudentGroupIdGroupIdStudentPut } from '#/api/hooks/useAssignGroupStudentGroupIdGroupIdStudentPut'
import { getAllStudentsStudentGetQueryKey } from '#/api/hooks/useGetAllStudentsStudentGet'
import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import {
  getStudentByIdStudentStudentIdGetQueryKey,
  getStudentByIdStudentStudentIdGetQueryOptions,
} from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import {
  getTeacherGroupsTeacherGroupsGetQueryKey,
  getTeacherGroupsTeacherGroupsGetQueryOptions,
} from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import { useRemoveGroupStudentGroupIdGroupIdStudentStudentIdDelete } from '#/api/hooks/useRemoveGroupStudentGroupIdGroupIdStudentStudentIdDelete'
import { toast } from '#/components/ui'
import { parseGroupSchedule } from '#/routes/-utils'
import type { GroupCardData } from '#/routes/_authorized/-components/group-card'

import type { StudentGroupAssignmentProps } from '../student-group-assignment'

interface AssignmentSnapshot {
  targetId: number
  sourceId: number | null
  removePrevious: boolean
  knownGroupIds: number[]
}

type AssignmentOutcome = 'error' | 'partial' | null

export function useStudentGroupAssignment(props: StudentGroupAssignmentProps) {
  const [selectedSourceId, setSelectedSourceId] = useState<number | null>(() => {
    if (props.fromGroupId !== null && props.groupIds.includes(props.fromGroupId)) {
      return props.fromGroupId
    }
    return null
  })
  const [selectedTargetId, setSelectedTargetId] = useState<number | null>(null)
  const [removePrevious, setRemovePrevious] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isKickConfirmOpen, setIsKickConfirmOpen] = useState(false)
  const [isKickError, setIsKickError] = useState(false)
  const [outcome, setOutcome] = useState<AssignmentOutcome>(null)
  const [isOperating, setIsOperating] = useState(false)

  const snapshotReference = useRef<AssignmentSnapshot | null>(null)

  const queryClient = useQueryClient()
  const t = useTranslate()

  const coursesQuery = useQuery(getCoursesCourseGetQueryOptions())
  const teacherGroupsQuery = useQuery(getTeacherGroupsTeacherGroupsGetQueryOptions())

  const assignGroupMutation = useAssignGroupStudentGroupIdGroupIdStudentPut({
    mutation: { retry: false },
  })
  const removeStudentMutation = useRemoveGroupStudentGroupIdGroupIdStudentStudentIdDelete({
    mutation: { retry: false },
  })

  function refetchStudent() {
    return queryClient
      .fetchQuery(
        getStudentByIdStudentStudentIdGetQueryOptions({ path: { student_id: props.studentId } }),
      )
      .catch(() => undefined)
  }

  async function invalidateAfterAssignment() {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: [{ url: '/group/id/:group_id' }] }),
      queryClient.invalidateQueries({
        queryKey: getStudentByIdStudentStudentIdGetQueryKey({
          path: { student_id: props.studentId },
        }),
      }),
      queryClient.invalidateQueries({ queryKey: getTeacherGroupsTeacherGroupsGetQueryKey() }),
      queryClient.invalidateQueries({ queryKey: getAllStudentsStudentGetQueryKey() }),
    ])
  }

  async function attemptRemoval(snapshot: AssignmentSnapshot) {
    if (snapshot.sourceId === null) return true
    try {
      await removeStudentMutation.mutateAsync({
        path: { group_id: snapshot.sourceId, student_id: props.studentId },
      })
      return true
    } catch {
      const student = await refetchStudent()
      if (student && !student.group_ids.includes(snapshot.sourceId)) return true
      setOutcome('partial')
      return false
    }
  }

  async function runAssignment(snapshot: AssignmentSnapshot) {
    setIsOperating(true)
    snapshotReference.current = snapshot
    try {
      if (!snapshot.knownGroupIds.includes(snapshot.targetId)) {
        try {
          await assignGroupMutation.mutateAsync({
            path: { group_id: snapshot.targetId },
            body: { student_id: props.studentId },
          })
        } catch {
          const student = await refetchStudent()
          if (!student?.group_ids.includes(snapshot.targetId)) throw new Error('assignment failed')
        }
      }
    } catch {
      await refetchStudent()
      setOutcome('error')
      setIsOperating(false)
      return
    }
    const isRemoved = snapshot.removePrevious ? await attemptRemoval(snapshot) : true
    if (!isRemoved) {
      setIsOperating(false)
      return
    }
    await invalidateAfterAssignment()
    setSelectedTargetId(null)
    if (snapshot.removePrevious) {
      setSelectedSourceId(null)
      setRemovePrevious(false)
    }
    setOutcome(null)
    setIsConfirmOpen(false)
    setIsOperating(false)
    props.onSuccess()
    toast.add({ title: t('student.edit.groups.success'), type: 'success' })
  }

  function handleSourceSelect(groupId: number) {
    if (isOperating) return
    if (sourceId === null) setRemovePrevious(false)
    setOutcome(null)
    setSelectedSourceId(groupId)
  }

  function handleTargetSelect(groupId: number) {
    if (isOperating) return
    setOutcome(null)
    setSelectedTargetId(groupId === targetId ? null : groupId)
  }

  function handleRemovePreviousChange(checked: boolean | 'indeterminate') {
    if (isOperating) return
    setRemovePrevious(checked === true)
  }

  function handleConfirmOpenChange(isOpen: boolean) {
    if (isOperating) return
    if (isOpen) {
      setOutcome(null)
      snapshotReference.current = null
    }
    setIsConfirmOpen(isOpen)
  }

  function handleConfirm() {
    if (isOperating || targetId === null) return
    void runAssignment({
      targetId,
      sourceId,
      removePrevious: shouldRemovePrevious,
      knownGroupIds: props.groupIds,
    })
  }

  function handleRetryRemoval() {
    const stored = snapshotReference.current
    if (!stored || isOperating || stored.sourceId === null) return
    void runAssignment({
      targetId: stored.targetId,
      sourceId: stored.sourceId,
      removePrevious: true,
      knownGroupIds: [stored.targetId, ...stored.knownGroupIds],
    })
  }

  function handleRetryOptions() {
    if (isOptionsRetrying) return
    if (coursesQuery.isError) void coursesQuery.refetch()
    if (teacherGroupsQuery.isError) void teacherGroupsQuery.refetch()
  }

  function handleKickOpenChange(isOpen: boolean) {
    if (isOperating) return
    if (isOpen) {
      setIsKickError(false)
      removeStudentMutation.reset()
    }
    setIsKickConfirmOpen(isOpen)
  }

  async function runKick() {
    if (sourceId === null) return
    setIsOperating(true)
    try {
      await removeStudentMutation.mutateAsync({
        path: { group_id: sourceId, student_id: props.studentId },
      })
    } catch {
      const student = await refetchStudent()
      if (student && student.group_ids.includes(sourceId)) {
        setIsOperating(false)
        setIsKickError(true)
        return
      }
    }
    await invalidateAfterAssignment()
    setSelectedSourceId(null)
    setRemovePrevious(false)
    setIsKickConfirmOpen(false)
    setIsKickError(false)
    setIsOperating(false)
    props.onSuccess()
    toast.add({ title: t('student.edit.groups.success'), type: 'success' })
  }

  function handleKick() {
    if (isOperating || sourceId === null || removeStudentMutation.isPending) return
    void runKick()
  }

  const isOptionsPending = coursesQuery.isPending || teacherGroupsQuery.isPending
  const isOptionsError = coursesQuery.isError || teacherGroupsQuery.isError
  const isOptionsRetrying = coursesQuery.isFetching || teacherGroupsQuery.isFetching
  const groups = (teacherGroupsQuery.data ?? []).flatMap((group) => {
    const course = coursesQuery.data?.find((candidate) => candidate.id === group.course_id)
    if (!course) return []
    return [
      {
        id: group.id,
        name: group.name,
        courseName: course.name,
        category: course.category,
        schedule: parseGroupSchedule(group.name),
        studentsCount: group.students_count ?? 0,
      } satisfies GroupCardData,
    ]
  })
  const sourceGroups = groups.filter((group) => props.groupIds.includes(group.id))
  const targetGroups = groups.filter((group) => !props.groupIds.includes(group.id))
  const isSourceNotice = selectedSourceId !== null && !props.groupIds.includes(selectedSourceId)
  const isTargetNotice = selectedTargetId !== null && props.groupIds.includes(selectedTargetId)
  const sourceId = sourceGroups.find((group) => group.id === selectedSourceId)?.id ?? null
  const targetId = targetGroups.find((group) => group.id === selectedTargetId)?.id ?? null
  const shouldRemovePrevious = removePrevious && sourceId !== null
  const visibleOutcome = isTargetNotice && outcome === 'error' ? null : outcome
  const sourceName =
    sourceId !== null ? (sourceGroups.find((group) => group.id === sourceId)?.name ?? null) : null
  const targetName =
    targetId !== null ? (targetGroups.find((group) => group.id === targetId)?.name ?? null) : null
  const isTransfer = sourceId !== null
  const canRemovePrevious = sourceId !== null
  const canSubmit = targetId !== null

  return {
    state: {
      sourceGroups,
      targetGroups,
      sourceId,
      targetId,
      sourceName,
      targetName,
      removePrevious: shouldRemovePrevious,
      isConfirmOpen,
      outcome: visibleOutcome,
      isOperating,
      isOptionsPending,
      isOptionsError,
      isOptionsRetrying,
      isSourceNotice,
      isTargetNotice,
      isTransfer,
      isKickConfirmOpen,
      isKickError,
      isKickOperating: removeStudentMutation.isPending,
      canRemovePrevious,
      canSubmit,
    },
    queries: {
      courses: coursesQuery,
      teacherGroups: teacherGroupsQuery,
    },
    mutations: { assignGroup: assignGroupMutation, removeStudent: removeStudentMutation },
    functions: {
      handleSourceSelect,
      handleTargetSelect,
      handleRemovePreviousChange,
      handleConfirmOpenChange,
      handleConfirm,
      handleRetryRemoval,
      handleRetryOptions,
      handleKickOpenChange,
      handleKick,
    },
  }
}
