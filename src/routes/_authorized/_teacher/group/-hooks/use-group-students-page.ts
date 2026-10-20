import { useTranslate } from '@kanjou/react'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost } from '#/api/hooks/useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { useGetGroupByIdGroupIdGroupIdGet } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { useGetStudentTransactionHistoryStudentStudentIdTransactionsGet } from '#/api/hooks/useGetStudentTransactionHistoryStudentStudentIdTransactionsGet'
import { BalanceChangeReasonsKey } from '#/api/types'
import { parseGroupSchedule } from '#/routes/-utils'
import { AVATARS } from '#/routes/_auth/register/-constants'

import { StudentSortOrder } from '../-constants'

export function useGroupStudentsPage() {
  const t = useTranslate()
  const params = useParams({ from: '/_authorized/_teacher/group/$groupId' })
  const coursesQuery = useGetCoursesCourseGet()
  const groupQuery = useGetGroupByIdGroupIdGroupIdGet({
    path: { group_id: Number(params.groupId) },
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<StudentSortOrder>(StudentSortOrder.NameAsc)
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const awardsQuery = useGetStudentTransactionHistoryStudentStudentIdTransactionsGet(
    { path: { student_id: selectedStudentId ?? 0 } },
    { query: { enabled: selectedStudentId !== null && isDrawerOpen } },
  )
  const createAwardMutation = useChangeStudentBalanceStudentStudentIdBalanceTransactionsPost({
    mutation: {
      onSuccess: async () => {
        await Promise.all([groupQuery.refetch(), awardsQuery.refetch()])
        setIsDrawerOpen(false)
      },
    },
  })

  function handleSearchChange(query: string) {
    setSearchQuery(query)
  }

  function handleSortChange(nextSortOrder: StudentSortOrder) {
    setSortOrder(nextSortOrder)
  }

  function handleSelectStudent(studentId: number) {
    createAwardMutation.reset()
    setSelectedStudentId(studentId)
    setIsDrawerOpen(true)
  }

  function handleDrawerOpenChange(isOpen: boolean) {
    setIsDrawerOpen(isOpen)
  }

  function handleAward(studentId: number, reason: BalanceChangeReasonsKey[]) {
    if (createAwardMutation.isPending) return
    createAwardMutation.mutate({
      path: { student_id: studentId },
      body: { reason },
    })
  }

  const students = (groupQuery.data?.students ?? []).map((student) => ({
    ...student,
    avatar: AVATARS.find((avatar) => avatar === student.avatar) ?? AVATARS[0],
  }))
  const selectedStudent = students.find((student) => student.id === selectedStudentId) ?? null
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const sortedStudents = [...filteredStudents].sort((first, second) => {
    if (sortOrder === StudentSortOrder.NameAsc) return first.name.localeCompare(second.name)
    if (sortOrder === StudentSortOrder.NameDesc) return second.name.localeCompare(first.name)
    if (sortOrder === StudentSortOrder.BalanceDesc) return second.balance - first.balance
    if (sortOrder === StudentSortOrder.BalanceAsc) return first.balance - second.balance
    return 0
  })
  const schedule = parseGroupSchedule(groupQuery.data?.name ?? '')
  const scheduleLabel = [schedule.weekday && t.unsafe(`weekday.${schedule.weekday}`), schedule.time]
    .filter(Boolean)
    .join(', ')

  return {
    state: {
      courseName:
        coursesQuery.data?.find((course) => course.id === groupQuery.data?.course_id)?.name ?? '',
      schedule: scheduleLabel,
      students: sortedStudents,
      hasStudents: !!sortedStudents.length,
      selectedStudent,
      studentAwards: awardsQuery.data?.transactions ?? [],
      searchQuery,
      sortOrder,
      isDrawerOpen,
      isPending: groupQuery.isPending,
      isError: groupQuery.isError,
    },
    queries: { group: groupQuery, awards: awardsQuery, courses: coursesQuery },
    mutations: { createAward: createAwardMutation },
    functions: {
      handleSearchChange,
      handleSortChange,
      handleSelectStudent,
      handleDrawerOpenChange,
      handleAward,
    },
  }
}
