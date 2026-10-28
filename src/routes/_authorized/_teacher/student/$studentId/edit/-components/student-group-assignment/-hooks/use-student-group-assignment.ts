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

interface AddAction {
  kind: 'add'
  targetId: number
}

interface TransferAction {
  kind: 'transfer'
  sourceId: number
  targetId: number
}

interface RemoveAction {
  kind: 'remove'
  sourceId: number
}

type GroupAction = AddAction | TransferAction | RemoveAction

interface GroupFailure {
  kind: 'error' | 'partial'
  action: GroupAction
}

export function useStudentGroupAssignment(props: StudentGroupAssignmentProps) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addTargetId, setAddTargetId] = useState<number | null>(null)
  const [isAddConfirmOpen, setIsAddConfirmOpen] = useState(false)
  const [transferSourceId, setTransferSourceId] = useState<number | null>(null)
  const [isTransferOpen, setIsTransferOpen] = useState(false)
  const [transferTargetId, setTransferTargetId] = useState<number | null>(null)
  const [isTransferConfirmOpen, setIsTransferConfirmOpen] = useState(false)
  const [removeSourceId, setRemoveSourceId] = useState<number | null>(null)
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false)
  const [failure, setFailure] = useState<GroupFailure | null>(null)
  const [isOperating, setIsOperating] = useState(false)

  const lastAction = useRef<GroupAction | null>(null)
  const assignedIds = useRef(new Set<number>())

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

  async function assignStudent(targetId: number) {
    if (props.groupIds.includes(targetId) || assignedIds.current.has(targetId)) return true
    try {
      await assignGroupMutation.mutateAsync({
        path: { group_id: targetId },
        body: { student_id: props.studentId },
      })
      assignedIds.current.add(targetId)
      return true
    } catch {
      const student = await refetchStudent()
      const isAssigned = !!student?.group_ids.includes(targetId)
      if (isAssigned) assignedIds.current.add(targetId)
      return isAssigned
    }
  }

  async function unassignStudent(sourceId: number) {
    try {
      await removeStudentMutation.mutateAsync({
        path: { group_id: sourceId, student_id: props.studentId },
      })
      return true
    } catch {
      const student = await refetchStudent()
      return !!student && !student.group_ids.includes(sourceId)
    }
  }

  function resetDialogs() {
    setIsAddOpen(false)
    setAddTargetId(null)
    setIsAddConfirmOpen(false)
    setIsTransferOpen(false)
    setTransferSourceId(null)
    setTransferTargetId(null)
    setIsTransferConfirmOpen(false)
    setRemoveSourceId(null)
    setIsRemoveConfirmOpen(false)
    setFailure(null)
    lastAction.current = null
    assignedIds.current.clear()
  }

  async function execute(action: GroupAction) {
    setIsOperating(true)
    lastAction.current = action
    try {
      if (action.kind === 'add' && !(await assignStudent(action.targetId))) {
        setFailure({ kind: 'error', action })
        return
      }
      if (action.kind === 'transfer') {
        if (!(await assignStudent(action.targetId))) {
          setFailure({ kind: 'error', action })
          return
        }
        if (!(await unassignStudent(action.sourceId))) {
          setFailure({ kind: 'partial', action })
          return
        }
      }
      if (action.kind === 'remove' && !(await unassignStudent(action.sourceId))) {
        setFailure({ kind: 'error', action })
        return
      }
      await invalidateAfterAssignment()
      resetDialogs()
      props.onSuccess()
      toast.add({ title: t('student.edit.groups.success'), type: 'success' })
    } finally {
      setIsOperating(false)
    }
  }

  function handleOpenAdd() {
    if (isOperating) return
    setFailure(null)
    setAddTargetId(null)
    setIsAddOpen(true)
  }

  function handleAddOpenChange(isOpen: boolean) {
    if (isOperating) return
    setIsAddOpen(isOpen)
  }

  function handleAddTargetSelect(groupId: number) {
    if (isOperating) return
    setIsAddOpen(false)
    setAddTargetId(groupId)
    setIsAddConfirmOpen(true)
  }

  function handleAddConfirmOpenChange(isOpen: boolean) {
    if (isOperating) return
    if (!isOpen) {
      setFailure(null)
      setAddTargetId(null)
    }
    setIsAddConfirmOpen(isOpen)
  }

  function handleAddConfirm() {
    if (isOperating || addTargetId === null) return
    void execute({ kind: 'add', targetId: addTargetId })
  }

  function handleOpenTransfer(sourceId: number) {
    if (isOperating) return
    setFailure(null)
    setTransferSourceId(sourceId)
    setTransferTargetId(null)
    setIsTransferOpen(true)
  }

  function handleTransferOpenChange(isOpen: boolean) {
    if (isOperating) return
    setIsTransferOpen(isOpen)
  }

  function handleTransferTargetSelect(groupId: number) {
    if (isOperating) return
    setIsTransferOpen(false)
    setTransferTargetId(groupId)
    setIsTransferConfirmOpen(true)
  }

  function handleTransferConfirmOpenChange(isOpen: boolean) {
    if (isOperating) return
    if (!isOpen) {
      setFailure(null)
      setTransferSourceId(null)
      setTransferTargetId(null)
    }
    setIsTransferConfirmOpen(isOpen)
  }

  function handleTransferConfirm() {
    if (isOperating || transferSourceId === null || transferTargetId === null) return
    void execute({
      kind: 'transfer',
      sourceId: transferSourceId,
      targetId: transferTargetId,
    })
  }

  function handleOpenRemove(sourceId: number) {
    if (isOperating) return
    setFailure(null)
    setRemoveSourceId(sourceId)
    setIsRemoveConfirmOpen(true)
  }

  function handleRemoveConfirmOpenChange(isOpen: boolean) {
    if (isOperating) return
    if (!isOpen) {
      setFailure(null)
      setRemoveSourceId(null)
    }
    setIsRemoveConfirmOpen(isOpen)
  }

  function handleRemoveConfirm() {
    if (isOperating || removeSourceId === null) return
    void execute({ kind: 'remove', sourceId: removeSourceId })
  }

  function handleRetry() {
    const action = lastAction.current
    if (!action || isOperating) return
    void execute(action)
  }

  function handleRetryOptions() {
    if (isOptionsRetrying) return
    if (coursesQuery.isError) void coursesQuery.refetch()
    if (teacherGroupsQuery.isError) void teacherGroupsQuery.refetch()
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
  const memberships = groups.filter((group) => props.groupIds.includes(group.id))
  const targetGroups = groups.filter((group) => !props.groupIds.includes(group.id))
  const addTargetName =
    addTargetId !== null
      ? (targetGroups.find((group) => group.id === addTargetId)?.name ?? null)
      : null
  const transferSourceName =
    transferSourceId !== null
      ? (memberships.find((group) => group.id === transferSourceId)?.name ?? null)
      : null
  const transferTargetName =
    transferTargetId !== null
      ? (targetGroups.find((group) => group.id === transferTargetId)?.name ?? null)
      : null
  const removeSourceName =
    removeSourceId !== null
      ? (memberships.find((group) => group.id === removeSourceId)?.name ?? null)
      : null
  const addFailure = failure?.action.kind === 'add' ? failure : null
  const transferFailure = failure?.action.kind === 'transfer' ? failure : null
  const removeFailure = failure?.action.kind === 'remove' ? failure : null

  return {
    state: {
      memberships,
      targetGroups,
      isOptionsPending,
      isOptionsError,
      isOptionsRetrying,
      isOperating,
      isAddOpen,
      isAddConfirmOpen,
      addTargetName,
      isTransferOpen,
      isTransferConfirmOpen,
      transferSourceName,
      transferTargetName,
      isRemoveConfirmOpen,
      removeSourceName,
      addFailure,
      transferFailure,
      removeFailure,
    },
    queries: {
      courses: coursesQuery,
      teacherGroups: teacherGroupsQuery,
    },
    mutations: { assignGroup: assignGroupMutation, removeStudent: removeStudentMutation },
    functions: {
      handleOpenAdd,
      handleAddOpenChange,
      handleAddTargetSelect,
      handleAddConfirmOpenChange,
      handleAddConfirm,
      handleOpenTransfer,
      handleTransferOpenChange,
      handleTransferTargetSelect,
      handleTransferConfirmOpenChange,
      handleTransferConfirm,
      handleOpenRemove,
      handleRemoveConfirmOpenChange,
      handleRemoveConfirm,
      handleRetry,
      handleRetryOptions,
    },
  }
}
