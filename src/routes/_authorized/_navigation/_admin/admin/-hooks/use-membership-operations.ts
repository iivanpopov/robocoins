import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import { useAssignGroupStudentGroupIdGroupIdStudentPut } from '#/api/hooks/useAssignGroupStudentGroupIdGroupIdStudentPut'
import { getStudentByIdStudentStudentIdGetQueryOptions } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { useRemoveGroupStudentGroupIdGroupIdStudentStudentIdDelete } from '#/api/hooks/useRemoveGroupStudentGroupIdGroupIdStudentStudentIdDelete'

import type {
  MembershipAdditionStatus,
  MembershipOperationInput,
  MembershipOperationMode,
  MembershipOperationResult,
  MembershipRemovalStatus,
  MembershipStudentCandidate,
} from '../-types'
import { getResponseErrorStatus, invalidateMembershipCaches } from '../-utils'

function createResult(
  student: MembershipStudentCandidate,
  mode: MembershipOperationMode,
  previous?: MembershipOperationResult,
) {
  if (previous) return { ...previous, studentName: student.name }

  let addition: MembershipAdditionStatus = 'pending'
  let removal: MembershipRemovalStatus = 'pending'

  if (mode === 'add') removal = 'notRequired'
  if (mode === 'remove') addition = 'notRequired'
  if (mode === 'transfer') removal = 'waiting'

  return {
    studentId: student.id,
    studentName: student.name,
    addition,
    removal,
    additionErrorStatus: null,
    removalErrorStatus: null,
  }
}

export function useMembershipOperations() {
  const [results, setResults] = useState<MembershipOperationResult[]>([])
  const [mode, setMode] = useState<MembershipOperationMode | null>(null)
  const [sourceGroupId, setSourceGroupId] = useState<number | null>(null)
  const [targetGroupId, setTargetGroupId] = useState<number | null>(null)
  const [isOperating, setIsOperating] = useState(false)
  const operationReference = useRef<MembershipOperationInput | null>(null)
  const isOperatingReference = useRef(false)

  const queryClient = useQueryClient()

  const assignStudentMutation = useAssignGroupStudentGroupIdGroupIdStudentPut({
    mutation: { retry: false },
  })
  const removeStudentMutation = useRemoveGroupStudentGroupIdGroupIdStudentStudentIdDelete({
    mutation: { retry: false },
  })

  async function verifyMembership(studentId: number, groupId: number) {
    try {
      const student = await queryClient.fetchQuery(
        getStudentByIdStudentStudentIdGetQueryOptions({ path: { student_id: studentId } }),
      )
      return student.group_ids.includes(groupId)
    } catch {
      return null
    }
  }

  async function attemptAddition(student: MembershipStudentCandidate, targetGroupId: number) {
    if (student.groupIds.includes(targetGroupId)) {
      return { addition: 'skipped' as const, errorStatus: null }
    }

    try {
      await assignStudentMutation.mutateAsync({
        path: { group_id: targetGroupId },
        body: { student_id: student.id },
      })
      return { addition: 'added' as const, errorStatus: null }
    } catch (error) {
      const isMember = await verifyMembership(student.id, targetGroupId)
      if (isMember === true) return { addition: 'added' as const, errorStatus: null }
      return { addition: 'failed' as const, errorStatus: getResponseErrorStatus(error) }
    }
  }

  async function attemptRemoval(student: MembershipStudentCandidate, sourceGroupId: number) {
    try {
      await removeStudentMutation.mutateAsync({
        path: { group_id: sourceGroupId, student_id: student.id },
      })
      return { removal: 'removed' as const, errorStatus: null }
    } catch (error) {
      const isMember = await verifyMembership(student.id, sourceGroupId)
      if (isMember === false) return { removal: 'removed' as const, errorStatus: null }
      return { removal: 'failed' as const, errorStatus: getResponseErrorStatus(error) }
    }
  }

  async function execute(
    input: MembershipOperationInput,
    existingResults: MembershipOperationResult[],
  ) {
    if (isOperatingReference.current) return

    isOperatingReference.current = true
    const existingById = new Map(
      existingResults.map((result) => [result.studentId, result] as const),
    )
    const nextResults = input.students.map((student) =>
      createResult(student, input.mode, existingById.get(student.id)),
    )

    setResults(nextResults)
    setIsOperating(true)

    try {
      for (let index = 0; index < input.students.length; index += 1) {
        const student = input.students[index]
        let result = nextResults[index]

        if (
          input.mode !== 'remove' &&
          result.addition !== 'added' &&
          result.addition !== 'skipped'
        ) {
          result = { ...result, addition: 'pending', additionErrorStatus: null }
          nextResults[index] = result
          setResults([...nextResults])

          if (input.targetGroupId === null) {
            result = { ...result, addition: 'failed', additionErrorStatus: null }
          } else {
            const outcome = await attemptAddition(student, input.targetGroupId)
            result = {
              ...result,
              addition: outcome.addition,
              additionErrorStatus: outcome.errorStatus,
            }
          }

          if (result.addition === 'failed' && input.mode === 'transfer') {
            result = { ...result, removal: 'waiting' }
          }
          if (input.mode === 'add') result = { ...result, removal: 'notRequired' }

          nextResults[index] = result
          setResults([...nextResults])
        }

        const additionConfirmed =
          input.mode === 'remove' || result.addition === 'added' || result.addition === 'skipped'

        if (
          input.mode !== 'add' &&
          additionConfirmed &&
          result.removal !== 'removed' &&
          input.sourceGroupId !== null
        ) {
          result = { ...result, removal: 'pending', removalErrorStatus: null }
          nextResults[index] = result
          setResults([...nextResults])

          const outcome = await attemptRemoval(student, input.sourceGroupId)
          result = {
            ...result,
            removal: outcome.removal,
            removalErrorStatus: outcome.errorStatus,
          }

          nextResults[index] = result
          setResults([...nextResults])
        }
      }
    } finally {
      await invalidateMembershipCaches(queryClient).catch(() => undefined)
      isOperatingReference.current = false
      setIsOperating(false)
    }
  }

  async function handleRun(input: MembershipOperationInput) {
    if (isOperatingReference.current) return

    operationReference.current = input
    setMode(input.mode)
    setSourceGroupId(input.sourceGroupId)
    setTargetGroupId(input.targetGroupId)
    assignStudentMutation.reset()
    removeStudentMutation.reset()

    await execute(input, [])
  }

  async function handleRetryFailed() {
    const input = operationReference.current
    if (!input || isOperatingReference.current) return

    await execute(input, results)
  }

  function handleReset() {
    if (isOperatingReference.current) return

    operationReference.current = null
    setResults([])
    setMode(null)
    setSourceGroupId(null)
    setTargetGroupId(null)
    assignStudentMutation.reset()
    removeStudentMutation.reset()
  }

  const hasFailures = results.some(
    (result) => result.addition === 'failed' || result.removal === 'failed',
  )
  const hasPartial = results.some(
    (result) =>
      (result.addition === 'added' || result.addition === 'skipped') && result.removal === 'failed',
  )
  const hasSessionFailure = results.some(
    (result) => result.additionErrorStatus === 401 || result.removalErrorStatus === 401,
  )
  const hasForbiddenFailure = results.some(
    (result) => result.additionErrorStatus === 403 || result.removalErrorStatus === 403,
  )

  return {
    state: {
      results,
      mode,
      sourceGroupId,
      targetGroupId,
      isOperating,
      hasFailures,
      hasPartial,
      hasSessionFailure,
      hasForbiddenFailure,
    },
    mutations: {
      assignStudent: assignStudentMutation,
      removeStudent: removeStudentMutation,
    },
    functions: { handleRun, handleRetryFailed, handleReset },
  }
}
