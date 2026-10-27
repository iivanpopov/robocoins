import { useState } from 'react'

import { useGetAllStudentsStudentGet } from '#/api/hooks/useGetAllStudentsStudentGet'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'

import type { StudentRowData } from '../-components'
import { combineCourseGroups, getApiErrorKind, getStudentCourseNames } from '../-utils'

export function useStudentsPage() {
  const [search, setSearch] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null)
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)

  const studentsQuery = useGetAllStudentsStudentGet()
  const coursesQuery = useGetCoursesCourseGet()

  function handleSearchChange(value: string) {
    setSearch(value)
  }

  function handleClearSearch() {
    setSearch('')
  }

  function handleCourseSelect(courseId: number | null) {
    setSelectedCourseId(courseId)
    if (courseId === null) {
      setSelectedGroupId(null)
      return
    }
    const selectedGroup = groups.find((group) => group.id === selectedGroupId)
    if (selectedGroup && selectedGroup.courseId !== courseId) setSelectedGroupId(null)
  }

  function handleGroupSelect(groupId: number | null) {
    setSelectedGroupId(groupId)
    if (groupId === null) return
    const group = groups.find((candidate) => candidate.id === groupId)
    if (group) setSelectedCourseId(group.courseId)
  }

  function handleRetry() {
    if (studentsQuery.isError && !studentsQuery.isFetching) void studentsQuery.refetch()
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()
  }

  function handleLogin() {
    window.location.assign('/login')
  }

  const groups = combineCourseGroups(coursesQuery.data)
  const selectedCourse = coursesQuery.data?.find((course) => course.id === selectedCourseId) ?? null
  const groupsForCourse =
    selectedCourseId === null ? [] : groups.filter((group) => group.courseId === selectedCourseId)

  const normalizedSearch = search.trim().toLocaleLowerCase(UKRAINIAN_LOCALE)
  const allStudents = studentsQuery.data ?? []
  const filteredStudents = allStudents
    .filter((student) => {
      if (
        normalizedSearch &&
        !student.name.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedSearch)
      ) {
        return false
      }
      if (selectedGroupId !== null) return student.group_ids.includes(selectedGroupId)
      if (selectedCourseId === null) return true

      const courseGroupIds = groupsForCourse.map((group) => group.id)
      const hasCourseGroup = student.group_ids.some((groupId) => courseGroupIds.includes(groupId))
      const hasCourseName = selectedCourse
        ? student.course_names.includes(selectedCourse.name)
        : false
      return hasCourseGroup || hasCourseName
    })
    .toSorted((first, second) => first.name.localeCompare(second.name, UKRAINIAN_LOCALE))

  const students = filteredStudents.map(
    (student) =>
      ({
        id: student.id,
        name: student.name,
        avatar: student.avatar,
        courseNames: getStudentCourseNames(student.course_names, student.group_ids, groups),
        groupCount: groups.filter((group) => student.group_ids.includes(group.id)).length,
      }) satisfies StudentRowData,
  )
  const error = studentsQuery.error ?? coursesQuery.error ?? null

  return {
    state: {
      search,
      selectedCourseId,
      selectedGroupId,
      courses: coursesQuery.data ?? [],
      groupsForCourse,
      students,
      foundCount: students.length,
      allCount: allStudents.length,
      errorKind: getApiErrorKind(error),
      isPending: studentsQuery.isPending || coursesQuery.isPending,
      isError: studentsQuery.isError || coursesQuery.isError,
      isRetrying: studentsQuery.isFetching || coursesQuery.isFetching,
    },
    queries: { students: studentsQuery, courses: coursesQuery },
    functions: {
      handleSearchChange,
      handleClearSearch,
      handleCourseSelect,
      handleGroupSelect,
      handleRetry,
      handleLogin,
    },
  }
}
