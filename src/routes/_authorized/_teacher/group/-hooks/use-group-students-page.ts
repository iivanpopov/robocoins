import { useTranslate } from '@kanjou/react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { useAwardGroupPracticeCompletedGroupIdGroupIdPracticeCompletedPost } from '#/api/hooks/useAwardGroupPracticeCompletedGroupIdGroupIdPracticeCompletedPost'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import {
  getGroupByIdGroupIdGroupIdGetQueryKey,
  useGetGroupByIdGroupIdGroupIdGet,
} from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { getStudentBalanceByIdStudentStudentIdBalanceGetQueryKey } from '#/api/hooks/useGetStudentBalanceByIdStudentStudentIdBalanceGet'
import { getStudentByIdStudentStudentIdGetQueryKey } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'
import { getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey } from '#/api/hooks/useGetStudentRewardProgressStudentStudentIdRewardProgressGet'
import { getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { StudentProfileResponse } from '#/api/types'
import { toast } from '#/components/ui'
import { Avatar, AVATARS } from '#/routes/-constants'
import { parseGroupSchedule } from '#/routes/-utils'

import { StudentSortOrder } from '../-constants'

export function useGroupStudentsPage() {
  const params = useParams({ from: '/_authorized/_teacher/group/$groupId' })

  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<StudentSortOrder>(StudentSortOrder.NameAsc)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isPracticeDialogOpen, setIsPracticeDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<
    (StudentProfileResponse & { avatar: Avatar }) | null
  >(null)

  const t = useTranslate()
  const queryClient = useQueryClient()
  const coursesQuery = useGetCoursesCourseGet()
  const groupQuery = useGetGroupByIdGroupIdGroupIdGet({
    path: { group_id: Number(params.groupId) },
  })
  const awardPracticeMutation = useAwardGroupPracticeCompletedGroupIdGroupIdPracticeCompletedPost({
    mutation: {
      retry: false,
      onSuccess: async (data, variables) => {
        setIsPracticeDialogOpen(false)
        toast.add({
          title: t('group.practice.success', { count: data.affected_students }),
          type: 'success',
        })
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: getGroupByIdGroupIdGroupIdGetQueryKey({ path: variables.path }),
          }),
          ...data.students.flatMap((student) => {
            const path = { student_id: student.student_id }
            return [
              queryClient.invalidateQueries({
                queryKey: getStudentTransactionHistoryStudentStudentIdTransactionsGetQueryKey({
                  path,
                }),
              }),
              queryClient.invalidateQueries({
                queryKey: getStudentBalanceByIdStudentStudentIdBalanceGetQueryKey({ path }),
              }),
              queryClient.invalidateQueries({
                queryKey: getStudentByIdStudentStudentIdGetQueryKey({ path }),
              }),
              queryClient.invalidateQueries({
                queryKey: getStudentRewardProgressStudentStudentIdRewardProgressGetQueryKey({
                  path,
                }),
              }),
            ]
          }),
        ])
      },
      onError: (_error, variables) => {
        void queryClient.invalidateQueries({
          queryKey: getGroupByIdGroupIdGroupIdGetQueryKey({ path: variables.path }),
        })
      },
    },
  })

  function handlePracticeDialogOpenChange(open: boolean) {
    if (awardPracticeMutation.isPending) return
    if (open) awardPracticeMutation.reset()
    setIsPracticeDialogOpen(open)
  }

  function handleAwardPractice() {
    if (
      awardPracticeMutation.isPending ||
      !groupQuery.isSuccess ||
      !groupQuery.data.students?.length
    )
      return
    awardPracticeMutation.mutate({ path: { group_id: Number(params.groupId) } })
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query)
  }

  function handleSortChange(nextSortOrder: StudentSortOrder) {
    setSortOrder(nextSortOrder)
  }

  function handleSelectStudent(student: StudentProfileResponse & { avatar: Avatar }) {
    setSelectedStudent(student)
    setIsDrawerOpen(true)
  }

  function handleDrawerOpenChange(isOpen: boolean) {
    setIsDrawerOpen(isOpen)
  }

  function handleDrawerOpenChangeComplete(isOpen: boolean) {
    if (!isOpen) setSelectedStudent(null)
  }

  function handleRetry() {
    void groupQuery.refetch()
  }

  const students = (groupQuery.data?.students ?? []).map((student) => ({
    ...student,
    avatar: AVATARS.find((avatar) => avatar === student.avatar) ?? AVATARS[0],
  }))
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const sortedStudents = filteredStudents.toSorted((first, second) => {
    if (sortOrder === StudentSortOrder.NameAsc) return first.name.localeCompare(second.name)
    if (sortOrder === StudentSortOrder.NameDesc) return second.name.localeCompare(first.name)
    if (sortOrder === StudentSortOrder.BalanceDesc) return second.balance - first.balance
    if (sortOrder === StudentSortOrder.BalanceAsc) return first.balance - second.balance
    return 0
  })
  const schedule = parseGroupSchedule(groupQuery.data?.name ?? '')

  return {
    state: {
      courseName:
        coursesQuery.data?.find((course) => course.id === groupQuery.data?.course_id)?.name ?? '',
      schedule,
      groupId: Number(params.groupId),
      students: sortedStudents,
      hasStudents: !!sortedStudents.length,
      selectedStudent:
        students.find((student) => student.id === selectedStudent?.id) ?? selectedStudent,
      searchQuery,
      sortOrder,
      isDrawerOpen,
      isPracticeDialogOpen,
      studentsCount: students.length,
      canAwardPractice: groupQuery.isSuccess && !!students.length,
      isPending: groupQuery.isPending,
      isError: groupQuery.isError,
      isRetrying: groupQuery.isFetching,
    },
    queries: { group: groupQuery, courses: coursesQuery },
    mutations: { awardPractice: awardPracticeMutation },
    functions: {
      handleSearchChange,
      handleSortChange,
      handleSelectStudent,
      handleDrawerOpenChange,
      handleDrawerOpenChangeComplete,
      handleRetry,
      handlePracticeDialogOpenChange,
      handleAwardPractice,
    },
  }
}
