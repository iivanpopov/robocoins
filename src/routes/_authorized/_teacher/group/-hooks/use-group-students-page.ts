import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { useGetGroupByIdGroupIdGroupIdGet } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { StudentProfileResponse } from '#/api/types'
import { Avatar, AVATARS } from '#/routes/-constants'
import { parseGroupSchedule } from '#/routes/-utils'

import { StudentSortOrder } from '../-constants'

export function useGroupStudentsPage() {
  const params = useParams({ from: '/_authorized/_teacher/group/$groupId' })

  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState<StudentSortOrder>(StudentSortOrder.NameAsc)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<
    (StudentProfileResponse & { avatar: Avatar }) | null
  >(null)

  const coursesQuery = useGetCoursesCourseGet()
  const groupQuery = useGetGroupByIdGroupIdGroupIdGet({
    path: { group_id: Number(params.groupId) },
  })

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
      isPending: groupQuery.isPending,
      isError: groupQuery.isError,
      isRetrying: groupQuery.isFetching,
    },
    queries: { group: groupQuery, courses: coursesQuery },
    functions: {
      handleSearchChange,
      handleSortChange,
      handleSelectStudent,
      handleDrawerOpenChange,
      handleDrawerOpenChangeComplete,
      handleRetry,
    },
  }
}
