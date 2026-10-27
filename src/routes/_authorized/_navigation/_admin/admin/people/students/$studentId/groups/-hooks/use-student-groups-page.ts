import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { useGetStudentByIdStudentStudentIdGet } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'

import { getApiErrorKind } from '../../../-utils'
import { useMembershipOperations } from '../../../../../-hooks'
import type { MembershipStudentCandidate } from '../../../../../-types'
import { combineCourseGroups } from '../../../../../-utils'

export function useStudentGroupsPage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/groups/',
  })

  const studentId = Number(params.studentId)

  const [addTargetValue, setAddTargetValue] = useState('')
  const [transferSourceValue, setTransferSourceValue] = useState('')
  const [transferTargetValue, setTransferTargetValue] = useState('')
  const [removalGroupId, setRemovalGroupId] = useState<number | null>(null)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)

  const studentQuery = useGetStudentByIdStudentStudentIdGet({
    path: { student_id: studentId },
  })
  const coursesQuery = useGetCoursesCourseGet()
  const membership = useMembershipOperations()

  function handleAddTargetChange(value: string) {
    if (membership.state.isOperating) return
    setAddTargetValue(value)
  }

  function handleTransferSourceChange(value: string) {
    if (membership.state.isOperating) return
    setTransferSourceValue(value)
  }

  function handleTransferTargetChange(value: string) {
    if (membership.state.isOperating) return
    setTransferTargetValue(value)
  }

  function handleAdd() {
    if (!studentCandidate || !addTargetGroup || membership.state.isOperating) return

    setAddTargetValue('')
    void membership.functions.handleRun({
      mode: 'add',
      sourceGroupId: null,
      targetGroupId: addTargetGroup.id,
      students: [studentCandidate],
    })
  }

  function handleOpenRemoveDialog(groupId: number) {
    if (membership.state.isOperating) return
    setRemovalGroupId(groupId)
    setIsRemoveDialogOpen(true)
  }

  function handleRemoveDialogOpenChange(isOpen: boolean) {
    if (membership.state.isOperating) return
    setIsRemoveDialogOpen(isOpen)
  }

  function handleConfirmRemove() {
    if (!studentCandidate || !removalGroup || membership.state.isOperating) return

    setIsRemoveDialogOpen(false)
    setRemovalGroupId(null)
    void membership.functions.handleRun({
      mode: 'remove',
      sourceGroupId: removalGroup.id,
      targetGroupId: null,
      students: [studentCandidate],
    })
  }

  function handleOpenTransferDialog() {
    if (membership.state.isOperating || !sourceGroup || !transferTargetGroup || !studentCandidate) {
      return
    }
    setIsTransferDialogOpen(true)
  }

  function handleTransferDialogOpenChange(isOpen: boolean) {
    if (membership.state.isOperating) return
    setIsTransferDialogOpen(isOpen)
  }

  function handleConfirmTransfer() {
    if (membership.state.isOperating || !sourceGroup || !transferTargetGroup || !studentCandidate) {
      return
    }

    const sourceGroupId = sourceGroup.id
    const targetGroupId = transferTargetGroup.id
    setIsTransferDialogOpen(false)
    setTransferSourceValue('')
    setTransferTargetValue('')
    void membership.functions.handleRun({
      mode: 'transfer',
      sourceGroupId,
      targetGroupId,
      students: [studentCandidate],
    })
  }

  function handleRetryMembership() {
    void membership.functions.handleRetryFailed()
  }

  function handleResetMembership() {
    membership.functions.handleReset()
  }

  function handleRetry() {
    if (studentQuery.isFetching) return
    void studentQuery.refetch()
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  function handleBack() {
    void navigate({
      to: '/admin/people/students/$studentId',
      params: { studentId },
    })
  }

  const student = studentQuery.data ?? null
  const groups = combineCourseGroups(coursesQuery.data)
  const memberships = student ? groups.filter((group) => student.group_ids.includes(group.id)) : []
  const targetGroups = student
    ? groups.filter((group) => !student.group_ids.includes(group.id))
    : []
  const addTargetGroup = targetGroups.find((group) => String(group.id) === addTargetValue) ?? null
  const sourceGroup = memberships.find((group) => String(group.id) === transferSourceValue) ?? null
  const transferTargetGroup =
    targetGroups.find((group) => String(group.id) === transferTargetValue) ?? null
  const removalGroup = memberships.find((group) => group.id === removalGroupId) ?? null
  const studentCandidate: MembershipStudentCandidate | null = student
    ? {
        id: student.id,
        name: student.name,
        avatar: student.avatar,
        groupIds: student.group_ids,
      }
    : null
  const resultSourceGroupName =
    groups.find((group) => group.id === membership.state.sourceGroupId)?.name ?? null
  const resultTargetGroupName =
    groups.find((group) => group.id === membership.state.targetGroupId)?.name ?? null
  const error = studentQuery.error ?? coursesQuery.error ?? null
  const canAdd = !!studentCandidate && !!addTargetGroup && !membership.state.isOperating
  const canTransfer =
    !!studentCandidate && !!sourceGroup && !!transferTargetGroup && !membership.state.isOperating

  return {
    state: {
      studentId,
      student,
      memberships,
      targetGroups,
      addTargetValue,
      transferSourceValue,
      transferTargetValue,
      sourceGroupName: sourceGroup?.name ?? null,
      transferTargetGroupName: transferTargetGroup?.name ?? null,
      removalGroupName: removalGroup?.name ?? null,
      canAdd,
      canTransfer,
      isRemoveDialogOpen,
      isTransferDialogOpen,
      membership: membership.state,
      resultSourceGroupName,
      resultTargetGroupName,
      errorKind: getApiErrorKind(error),
      isPending: studentQuery.isPending || coursesQuery.isPending,
      isError: studentQuery.isError || coursesQuery.isError,
      isRetrying: studentQuery.isFetching || coursesQuery.isFetching,
    },
    queries: { student: studentQuery, courses: coursesQuery },
    mutations: membership.mutations,
    functions: {
      handleAddTargetChange,
      handleTransferSourceChange,
      handleTransferTargetChange,
      handleAdd,
      handleOpenRemoveDialog,
      handleRemoveDialogOpenChange,
      handleConfirmRemove,
      handleOpenTransferDialog,
      handleTransferDialogOpenChange,
      handleConfirmTransfer,
      handleRetryMembership,
      handleResetMembership,
      handleRetry,
      handleLogin,
      handleBack,
    },
  }
}
