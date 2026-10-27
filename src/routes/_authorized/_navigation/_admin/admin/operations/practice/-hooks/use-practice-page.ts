import { useQueries, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useRef, useState } from 'react'

import { awardGroupPracticeCompletedGroupIdGroupIdPracticeCompletedPost } from '#/api/clients/awardGroupPracticeCompletedGroupIdGroupIdPracticeCompletedPost'
import { useAwardGroupPracticeCompletedGroupIdGroupIdPracticeCompletedPost } from '#/api/hooks/useAwardGroupPracticeCompletedGroupIdGroupIdPracticeCompletedPost'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { useGetGroupByIdGroupIdGroupIdGet } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { getGroupsByCourseIdGroupCourseCourseIdGetQueryOptions } from '#/api/hooks/useGetGroupsByCourseIdGroupCourseCourseIdGet'
import { getStudentBalanceByIdStudentStudentIdBalanceGetQueryOptions } from '#/api/hooks/useGetStudentBalanceByIdStudentStudentIdBalanceGet'
import type { GroupPracticeAwardResponse } from '#/api/types'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'
import {
  getApiErrorKind,
  getStudentTransactionsQueryOptions,
  invalidateStudentsBalanceCaches,
  isUnknownResultError,
  runWithTimeout,
} from '#/routes/_authorized/_navigation/_admin/admin/-utils'

import { getOperationErrorKey } from '../../-utils'
import { GROUP_FILTER_ALL } from '../../../-constants'

export function usePracticePage() {
  const search = useSearch({
    from: '/_authorized/_navigation/_admin/admin/operations/practice/',
  })
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [courseFilter, setCourseFilter] = useState(GROUP_FILTER_ALL)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [awardResult, setAwardResult] = useState<GroupPracticeAwardResponse | null>(null)
  const [unknownResult, setUnknownResult] = useState(false)
  const [unknownHistoryChecked, setUnknownHistoryChecked] = useState(false)
  const [unknownReadError, setUnknownReadError] = useState(false)
  const [isVerifyingUnknown, setIsVerifyingUnknown] = useState(false)
  const [isAwarding, setIsAwarding] = useState(false)
  const [refreshError, setRefreshError] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const isAwardingReference = useRef(false)

  const queryClient = useQueryClient()

  const selectedGroupId = search.groupId ?? null

  const coursesQuery = useGetCoursesCourseGet()
  const groupsQueries = useQueries({
    queries: (coursesQuery.data ?? []).map((course) =>
      getGroupsByCourseIdGroupCourseCourseIdGetQueryOptions({ path: { course_id: course.id } }),
    ),
  })
  const groupQuery = useGetGroupByIdGroupIdGroupIdGet(
    {
      path: { group_id: selectedGroupId ?? 0 },
    },
    { query: { enabled: !!selectedGroupId } },
  )

  const awardMutation = useAwardGroupPracticeCompletedGroupIdGroupIdPracticeCompletedPost({
    mutation: {
      retry: false,
      mutationFn: (variables) =>
        runWithTimeout((signal) =>
          awardGroupPracticeCompletedGroupIdGroupIdPracticeCompletedPost({
            ...variables,
            signal,
          }).unwrap(),
        ),
    },
  })

  function handleQueryChange(value: string) {
    setQuery(value)
  }

  function handleCourseFilterChange(value: string) {
    setCourseFilter(value)
  }

  function resetSelectionState() {
    setAwardResult(null)
    setUnknownResult(false)
    setUnknownHistoryChecked(false)
    setUnknownReadError(false)
    setRefreshError(false)
    awardMutation.reset()
  }

  function handleSelectGroup(groupId: number) {
    if (isAwardingReference.current || isAwarding || unknownResult) return

    resetSelectionState()
    void navigate({
      to: '/admin/operations/practice',
      search: { groupId },
      replace: true,
    })
  }

  function handleClearGroup() {
    if (isAwardingReference.current || isAwarding || unknownResult) return

    resetSelectionState()
    void navigate({ to: '/admin/operations/practice', search: {}, replace: true })
  }

  function handleRetryCourses() {
    if (coursesQuery.isFetching) return
    void coursesQuery.refetch()
  }

  function handleRetryGroups() {
    groupsQueries.forEach((groupsQuery) => {
      if (groupsQuery.isError && !groupsQuery.isFetching) void groupsQuery.refetch()
    })
  }

  function handleRetryGroup() {
    if (groupQuery.isFetching) return
    void groupQuery.refetch()
  }

  function handleRequestAward() {
    if (!selectedGroup || isAwardingReference.current || isAwarding || awardResult || unknownResult)
      return
    setIsConfirmOpen(true)
  }

  function handleConfirmOpenChange(open: boolean) {
    if (open || isAwardingReference.current || isAwarding) return
    setIsConfirmOpen(false)
  }

  function handleConfirmAward() {
    if (
      !selectedGroup ||
      isAwardingReference.current ||
      isAwarding ||
      awardResult ||
      unknownResult
    ) {
      return
    }

    setIsConfirmOpen(false)
    void runAward(selectedGroup.id)
  }

  async function runAward(groupId: number) {
    if (isAwardingReference.current) return

    isAwardingReference.current = true
    setIsAwarding(true)
    setRefreshError(false)
    setUnknownResult(false)
    setUnknownHistoryChecked(false)
    setUnknownReadError(false)

    try {
      const result = await awardMutation.mutateAsync({ path: { group_id: groupId } })
      setAwardResult(result)

      const studentIds = result.students.map((student) => student.student_id)
      try {
        await invalidateStudentsBalanceCaches(queryClient, studentIds, {
          throwOnError: true,
          cancelRefetch: false,
        })
        setRefreshError(false)
      } catch {
        setRefreshError(true)
      }
    } catch (error) {
      if (isUnknownResultError(error)) {
        setUnknownResult(true)
      }
    } finally {
      isAwardingReference.current = false
      setIsAwarding(false)
    }
  }

  async function handleVerifyUnknown() {
    if (!unknownResult || isVerifyingUnknown || unknownHistoryChecked) return

    const studentIds = (groupQuery.data?.students ?? []).map((student) => student.id)
    if (!studentIds.length) {
      setUnknownReadError(true)
      return
    }

    setIsVerifyingUnknown(true)
    setUnknownReadError(false)
    try {
      await Promise.all(
        studentIds.map(async (studentId) => {
          await Promise.all([
            queryClient.fetchInfiniteQuery(getStudentTransactionsQueryOptions(studentId)),
            queryClient.fetchQuery(
              getStudentBalanceByIdStudentStudentIdBalanceGetQueryOptions({
                path: { student_id: studentId },
              }),
            ),
          ])
        }),
      )
      await invalidateStudentsBalanceCaches(queryClient, studentIds, {
        throwOnError: false,
        cancelRefetch: false,
      })
      setUnknownHistoryChecked(true)
    } catch {
      setUnknownHistoryChecked(false)
      setUnknownReadError(true)
    } finally {
      setIsVerifyingUnknown(false)
    }
  }

  function handleAcknowledgeUnknown() {
    if (!unknownHistoryChecked || !unknownResult) return

    setUnknownResult(false)
    setUnknownHistoryChecked(false)
    setUnknownReadError(false)
    awardMutation.reset()
  }

  function handleResetAward() {
    if (isAwardingReference.current || isAwarding) return
    resetSelectionState()
  }

  async function handleRefreshData() {
    if (isRefreshing) return

    setIsRefreshing(true)
    try {
      const studentIds = awardResult
        ? awardResult.students.map((student) => student.student_id)
        : (groupQuery.data?.students ?? []).map((student) => student.id)
      await invalidateStudentsBalanceCaches(queryClient, studentIds, {
        throwOnError: true,
        cancelRefetch: false,
      })
      setRefreshError(false)
    } catch {
      setRefreshError(true)
    } finally {
      setIsRefreshing(false)
    }
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  const allGroups = groupsQueries.flatMap((groupsQuery, index) => {
    const course = coursesQuery.data?.[index]
    if (!course) return []

    return (groupsQuery.data ?? []).map((group) => ({
      id: group.id,
      name: group.name,
      courseId: course.id,
      courseName: course.name,
      studentsCount: group.students_count ?? 0,
    }))
  })
  const normalizedQuery = query.trim().toLocaleLowerCase(UKRAINIAN_LOCALE)
  const filteredGroups = allGroups
    .filter((group) => {
      if (courseFilter !== GROUP_FILTER_ALL && String(group.courseId) !== courseFilter) return false
      if (!normalizedQuery) return true
      if (group.name.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery)) return true
      return group.courseName.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery)
    })
    .toSorted((first, second) => {
      const courseOrder = first.courseName.localeCompare(second.courseName, UKRAINIAN_LOCALE)
      if (courseOrder !== 0) return courseOrder
      return first.name.localeCompare(second.name, UKRAINIAN_LOCALE)
    })
  const selectedGroup = allGroups.find((group) => group.id === selectedGroupId) ?? null
  const selectedGroupMissing =
    !!selectedGroupId &&
    !coursesQuery.isPending &&
    !groupsQueries.some((groups) => groups.isPending) &&
    !selectedGroup
  const groupStudents = groupQuery.data?.students ?? []
  const groupStudentNames = new Map(
    groupStudents.map((student) => [student.id, student.name] as const),
  )
  const groupsIsPending = groupsQueries.some((groupsQuery) => groupsQuery.isPending)
  const groupsIsError = groupsQueries.some((groupsQuery) => groupsQuery.isError)
  const groupsError = groupsQueries.find((groupsQuery) => groupsQuery.isError)?.error ?? null
  const groupsIsFetching = groupsQueries.some((groupsQuery) => groupsQuery.isFetching)
  const coursesErrorKind = coursesQuery.error ? getApiErrorKind(coursesQuery.error) : null
  const groupsErrorKind = groupsError ? getApiErrorKind(groupsError) : null
  const groupErrorKind = groupQuery.error ? getApiErrorKind(groupQuery.error) : null
  const awardErrorKind = awardMutation.error ? getApiErrorKind(awardMutation.error) : null
  const awardErrorKey =
    awardMutation.error && !unknownResult
      ? getOperationErrorKey(awardMutation.error, 'admin.operations.practice.error')
      : null
  const canAward =
    !!selectedGroup &&
    !!selectedGroup.studentsCount &&
    !isAwarding &&
    !awardResult &&
    !unknownResult

  return {
    state: {
      query,
      courseFilter,
      courses: coursesQuery.data ?? [],
      groups: filteredGroups,
      totalGroupCount: allGroups.length,
      selectedGroupId,
      selectedGroup,
      selectedGroupMissing,
      groupStudents,
      groupStudentNames,
      groupStudentsCount: groupQuery.data?.students_count ?? selectedGroup?.studentsCount ?? 0,
      isConfirmOpen,
      awardResult,
      unknownResult,
      unknownHistoryChecked,
      unknownReadError,
      isVerifyingUnknown,
      isAwarding,
      refreshError,
      isRefreshing,
      canAward,
      coursesIsPending: coursesQuery.isPending,
      coursesIsError: coursesQuery.isError,
      coursesErrorKind,
      coursesIsFetching: coursesQuery.isFetching,
      groupsIsPending,
      groupsIsError,
      groupsErrorKind,
      groupsIsFetching,
      groupIsPending: groupQuery.isPending,
      groupIsError: groupQuery.isError,
      groupErrorKind,
      groupIsFetching: groupQuery.isFetching,
      awardErrorKind,
      awardErrorKey,
    },
    queries: {
      courses: coursesQuery,
      groups: groupsQueries,
      group: groupQuery,
    },
    mutations: { award: awardMutation },
    functions: {
      handleQueryChange,
      handleCourseFilterChange,
      handleSelectGroup,
      handleClearGroup,
      handleRetryCourses,
      handleRetryGroups,
      handleRetryGroup,
      handleRequestAward,
      handleConfirmOpenChange,
      handleConfirmAward,
      handleVerifyUnknown,
      handleAcknowledgeUnknown,
      handleResetAward,
      handleRefreshData,
      handleLogin,
    },
  }
}
