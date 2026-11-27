import { useTranslate } from '@kanjou/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

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
import type { GroupOptions, GroupSelection } from '../types'

type GroupAction =
  | { kind: 'add'; target: GroupCardData }
  | { kind: 'transfer'; source: GroupCardData; target: GroupCardData }
  | { kind: 'remove'; source: GroupCardData }

type AssignmentDialog =
  | { step: 'pick'; selection: GroupSelection }
  | { step: 'confirm'; action: GroupAction; failure: 'error' | 'partial' | null }

export function useStudentGroupAssignment(props: StudentGroupAssignmentProps) {
  const [dialog, setDialog] = useState<AssignmentDialog | null>(null)
  const [isOperating, setIsOperating] = useState(false)

  const t = useTranslate()
  const queryClient = useQueryClient()
  const coursesQuery = useQuery(getCoursesCourseGetQueryOptions())
  const teacherGroupsQuery = useQuery(getTeacherGroupsTeacherGroupsGetQueryOptions())
  const assignGroupMutation = useAssignGroupStudentGroupIdGroupIdStudentPut({
    mutation: { retry: false },
  })
  const removeStudentMutation = useRemoveGroupStudentGroupIdGroupIdStudentStudentIdDelete({
    mutation: { retry: false },
  })

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
  const groupOptions: GroupOptions = {
    groups: groups.filter((group) => !props.groupIds.includes(group.id)),
    isPending: coursesQuery.isPending || teacherGroupsQuery.isPending,
    isError: coursesQuery.isError || teacherGroupsQuery.isError,
    isRetrying: coursesQuery.isFetching || teacherGroupsQuery.isFetching,
  }
  const selection = dialog?.step === 'pick' ? dialog.selection : null
  const confirmation = dialog?.step === 'confirm' ? dialog : null

  function refetchStudent() {
    return queryClient
      .query({
        ...getStudentByIdStudentStudentIdGetQueryOptions({ path: { student_id: props.studentId } }),
        staleTime: 0,
      })
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
    if (props.groupIds.includes(targetId)) return true
    try {
      await assignGroupMutation.mutateAsync({
        path: { group_id: targetId },
        body: { student_id: props.studentId },
      })
      return true
    } catch {
      const student = await refetchStudent()
      return !!student?.group_ids.includes(targetId)
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

  function handleOpenAdd() {
    if (!isOperating) setDialog({ step: 'pick', selection: { kind: 'add' } })
  }

  function handleOpenTransfer(source: GroupCardData) {
    if (!isOperating) setDialog({ step: 'pick', selection: { kind: 'transfer', source } })
  }

  function handleOpenRemove(source: GroupCardData) {
    if (!isOperating)
      setDialog({ step: 'confirm', action: { kind: 'remove', source }, failure: null })
  }

  function handleSelectTarget(target: GroupCardData) {
    if (!selection || isOperating) return
    setDialog({ step: 'confirm', action: { ...selection, target }, failure: null })
  }

  function handleCloseDialog() {
    if (!isOperating) setDialog(null)
  }

  async function handleConfirm() {
    if (!confirmation || isOperating) return
    const action = confirmation.action
    setIsOperating(true)
    try {
      if (action.kind !== 'remove' && confirmation.failure !== 'partial') {
        if (!(await assignStudent(action.target.id))) {
          setDialog({ ...confirmation, failure: 'error' })
          return
        }
      }
      if (action.kind !== 'add' && !(await unassignStudent(action.source.id))) {
        if (action.kind === 'transfer') {
          setDialog({ ...confirmation, failure: 'partial' })
          await invalidateAfterAssignment()
        } else {
          setDialog({ ...confirmation, failure: 'error' })
        }
        return
      }
      await invalidateAfterAssignment()
      setDialog(null)
      props.onSuccess()
      toast.add({ title: t('student.edit.groups.success'), type: 'success' })
    } finally {
      setIsOperating(false)
    }
  }

  function handleRetryOptions() {
    if (groupOptions.isRetrying) return
    if (coursesQuery.isError) void coursesQuery.refetch()
    if (teacherGroupsQuery.isError) void teacherGroupsQuery.refetch()
  }

  return {
    state: { memberships, groupOptions, isOperating, selection, confirmation },
    functions: {
      handleOpenAdd,
      handleOpenTransfer,
      handleOpenRemove,
      handleSelectTarget,
      handleCloseDialog,
      handleConfirm,
      handleRetryOptions,
    },
  }
}
