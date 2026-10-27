import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetAllStudentsStudentGet } from '#/api/hooks/useGetAllStudentsStudentGet'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'

import { useGroupRecord } from '../../../-hooks'
import type { GroupErrorKey } from '../../../-types'
import { getGroupErrorKey } from '../../../-utils'
import { useMembershipOperations } from '../../../../-hooks'
import type { MembershipStudentCandidate } from '../../../../-types'
import { combineCourseGroups, getResponseErrorStatus } from '../../../../-utils'

export function useGroupStudentsPage() {
  const navigate = useNavigate()
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/students/',
  })

  const groupId = params.groupId

  const [search, setSearch] = useState('')
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<number[]>([])
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([])
  const [targetGroupValue, setTargetGroupValue] = useState('')
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)

  const groupData = useGroupRecord(groupId)
  const studentsQuery = useGetAllStudentsStudentGet()
  const coursesQuery = useGetCoursesCourseGet()
  const membership = useMembershipOperations()

  function toCandidate(student: {
    id: number
    name: string
    avatar?: string | null
    group_ids: number[]
  }): MembershipStudentCandidate {
    return {
      id: student.id,
      name: student.name,
      avatar: student.avatar,
      groupIds: student.group_ids,
    }
  }

  function handleSearchChange(value: string) {
    setSearch(value)
  }

  function handleClearSearch() {
    setSearch('')
  }

  function handleCandidateToggle(studentId: number, checked: boolean) {
    if (membership.state.isOperating) return

    if (checked) {
      setSelectedCandidateIds((current) => {
        if (current.includes(studentId)) return current
        return [...current, studentId]
      })
      return
    }

    setSelectedCandidateIds((current) => current.filter((id) => id !== studentId))
  }

  function handleMemberToggle(studentId: number, checked: boolean) {
    if (membership.state.isOperating) return

    if (checked) {
      setSelectedMemberIds((current) => {
        if (current.includes(studentId)) return current
        return [...current, studentId]
      })
      return
    }

    setSelectedMemberIds((current) => current.filter((id) => id !== studentId))
  }

  function handleTargetGroupChange(value: string) {
    if (membership.state.isOperating) return
    setTargetGroupValue(value)
  }

  function handleOpenRemoveDialog() {
    if (membership.state.isOperating || !selectedMembers.length) return
    setIsRemoveDialogOpen(true)
  }

  function handleRemoveDialogOpenChange(isOpen: boolean) {
    if (membership.state.isOperating) return
    setIsRemoveDialogOpen(isOpen)
  }

  function handleOpenTransferDialog() {
    if (membership.state.isOperating || !selectedMembers.length || !targetGroup) return
    setIsTransferDialogOpen(true)
  }

  function handleTransferDialogOpenChange(isOpen: boolean) {
    if (membership.state.isOperating) return
    setIsTransferDialogOpen(isOpen)
  }

  function handleAddSelected() {
    if (!group || membership.state.isOperating || !selectedCandidateIds.length) return

    const students = selectedCandidates
    if (!students.length) return

    setSelectedCandidateIds([])
    void membership.functions.handleRun({
      mode: 'add',
      sourceGroupId: null,
      targetGroupId: group.id,
      students,
    })
  }

  function handleConfirmRemove() {
    if (membership.state.isOperating || !group || !selectedMembers.length) return

    const students = selectedMembers
    setIsRemoveDialogOpen(false)
    setSelectedMemberIds([])
    void membership.functions.handleRun({
      mode: 'remove',
      sourceGroupId: group.id,
      targetGroupId: null,
      students,
    })
  }

  function handleConfirmTransfer() {
    if (membership.state.isOperating || !group || !targetGroup || !selectedMembers.length) return

    const students = selectedMembers
    setIsTransferDialogOpen(false)
    setSelectedMemberIds([])
    setTargetGroupValue('')
    void membership.functions.handleRun({
      mode: 'transfer',
      sourceGroupId: group.id,
      targetGroupId: targetGroup.id,
      students,
    })
  }

  function handleRetryMembership() {
    void membership.functions.handleRetryFailed()
  }

  function handleResetMembership() {
    membership.functions.handleReset()
  }

  function handleRetryGroup() {
    if (groupData.groupQuery.isFetching) return
    void groupData.groupQuery.refetch()
  }

  function handleRetryStudents() {
    if (studentsQuery.isFetching) return
    void studentsQuery.refetch()
  }

  function handleRetryCourses() {
    if (coursesQuery.isFetching) return
    void coursesQuery.refetch()
  }

  function handleBack() {
    void navigate({
      to: '/admin/groups/$groupId',
      params: { groupId },
    })
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  function getGroupName(id: number | null) {
    if (id === null) return null
    const matchedGroup = groups.find((candidate) => candidate.id === id)
    if (matchedGroup) return matchedGroup.name
    if (id === groupId) return group?.name ?? null
    return null
  }

  const group = groupData.group
  const course = coursesQuery.data?.find((candidate) => candidate.id === group?.course_id) ?? null
  const hasStudentList = !!group && (Array.isArray(group.students) || !group.students_count)
  const students = (group?.students ?? []).map(toCandidate)
  const currentMemberIds = new Set(students.map((student) => student.id))
  const allStudents = (studentsQuery.data ?? []).map(toCandidate)
  const availableStudents = allStudents.filter(
    (student) => !currentMemberIds.has(student.id) && !student.groupIds.includes(groupId),
  )
  const selectedCandidates = availableStudents.filter((student) =>
    selectedCandidateIds.includes(student.id),
  )
  const normalizedSearch = search.trim().toLocaleLowerCase(UKRAINIAN_LOCALE)
  const candidates = availableStudents.filter((student) => {
    if (!normalizedSearch) return true
    return student.name.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedSearch)
  })
  const groups = combineCourseGroups(coursesQuery.data)
  const targetGroups = groups.filter((candidate) => candidate.id !== groupId)
  const targetGroup = targetGroups.find((candidate) => String(candidate.id) === targetGroupValue)
  const selectedMembers = students.filter((student) => selectedMemberIds.includes(student.id))
  const resultSourceGroupName = getGroupName(membership.state.sourceGroupId)
  const resultTargetGroupName = getGroupName(membership.state.targetGroupId)
  const isNotFound = getResponseErrorStatus(groupData.groupQuery.error) === 404

  let groupErrorKey: GroupErrorKey | null = null
  if (!isNotFound && groupData.groupQuery.isError) {
    groupErrorKey = getGroupErrorKey(groupData.groupQuery.error, 'admin.groups.detail.error')
  }

  return {
    state: {
      groupId,
      group,
      course,
      students,
      studentsCount: group?.students_count ?? students.length,
      candidates,
      candidateCount: candidates.length,
      availableCount: availableStudents.length,
      hasStudentList,
      search,
      selectedCandidateIds,
      selectedMemberIds,
      selectedCandidateCount: selectedCandidates.length,
      selectedMemberCount: selectedMembers.length,
      targetGroups,
      targetGroupValue,
      targetGroupName: targetGroup?.name ?? null,
      isRemoveDialogOpen,
      isTransferDialogOpen,
      groupErrorKey,
      isNotFound,
      isPending: groupData.groupQuery.isPending,
      isError: !!groupErrorKey,
      isGroupFetching: groupData.groupQuery.isFetching,
      isStudentsPending: studentsQuery.isPending,
      isStudentsError: studentsQuery.isError,
      isStudentsFetching: studentsQuery.isFetching,
      studentsErrorStatus: getResponseErrorStatus(studentsQuery.error),
      isCoursesPending: coursesQuery.isPending,
      isCoursesError: coursesQuery.isError,
      isCoursesFetching: coursesQuery.isFetching,
      coursesErrorStatus: getResponseErrorStatus(coursesQuery.error),
      membership: membership.state,
      resultSourceGroupName,
      resultTargetGroupName,
    },
    queries: {
      group: groupData.groupQuery,
      students: studentsQuery,
      courses: coursesQuery,
    },
    mutations: membership.mutations,
    functions: {
      handleSearchChange,
      handleClearSearch,
      handleCandidateToggle,
      handleMemberToggle,
      handleTargetGroupChange,
      handleOpenRemoveDialog,
      handleRemoveDialogOpenChange,
      handleOpenTransferDialog,
      handleTransferDialogOpenChange,
      handleAddSelected,
      handleConfirmRemove,
      handleConfirmTransfer,
      handleRetryMembership,
      handleResetMembership,
      handleRetryGroup,
      handleRetryStudents,
      handleRetryCourses,
      handleBack,
      handleLogin,
    },
  }
}
