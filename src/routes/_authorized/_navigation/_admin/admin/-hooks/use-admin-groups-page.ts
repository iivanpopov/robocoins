import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'

import { ResponseError } from '#/api/.kubb/client'
import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { getGroupsByCourseIdGroupCourseCourseIdGetQueryOptions } from '#/api/hooks/useGetGroupsByCourseIdGroupCourseCourseIdGet'
import { useGetUsersUsersGet } from '#/api/hooks/useGetUsersUsersGet'
import type { CourseCategoryKey } from '#/api/types'
import { UKRAINIAN_LOCALE } from '#/routes/-constants'

import type { AdminGroupRowData } from '../-components'
import { GROUP_FILTER_ALL } from '../-constants'
import type { AdminGroupsErrorKey } from '../-types'

export interface AdminGroupTeacherOption {
  userId: number
  name: string | null
}

export function useAdminGroupsPage() {
  const [query, setQuery] = useState('')
  const [courseFilter, setCourseFilter] = useState(GROUP_FILTER_ALL)
  const [categoryFilter, setCategoryFilter] = useState<string>(GROUP_FILTER_ALL)
  const [teacherFilter, setTeacherFilter] = useState(GROUP_FILTER_ALL)

  const coursesQuery = useGetCoursesCourseGet()
  const usersQuery = useGetUsersUsersGet()

  const groupsQueries = useQueries({
    queries: (coursesQuery.data ?? []).map((course) =>
      getGroupsByCourseIdGroupCourseCourseIdGetQueryOptions({ path: { course_id: course.id } }),
    ),
  })

  function handleQueryChange(value: string) {
    setQuery(value)
  }

  function handleCourseFilterChange(value: string) {
    setCourseFilter(value)
  }

  function handleCategoryFilterChange(value: string) {
    setCategoryFilter(value)
  }

  function handleTeacherFilterChange(value: string) {
    setTeacherFilter(value)
  }

  function handleClearFilters() {
    setQuery('')
    setCourseFilter(GROUP_FILTER_ALL)
    setCategoryFilter(GROUP_FILTER_ALL)
    setTeacherFilter(GROUP_FILTER_ALL)
  }

  function handleRetry() {
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()
    if (usersQuery.isError && !usersQuery.isFetching) void usersQuery.refetch()

    groupsQueries.forEach((groupsQuery) => {
      if (groupsQuery.isError && !groupsQuery.isFetching) void groupsQuery.refetch()
    })
  }

  const teacherNameById = new Map(
    (usersQuery.data ?? []).map((user) => [user.id, user.name] as const),
  )

  const allGroups = groupsQueries.flatMap((groupsQuery, index) => {
    const course = coursesQuery.data?.[index]
    if (!course) return []

    return (groupsQuery.data ?? []).map((group) => {
      const teachers = (group.teacher_ids ?? []).map((userId) => ({
        userId,
        name: teacherNameById.get(userId) ?? null,
      }))

      return {
        id: group.id,
        name: group.name,
        courseId: course.id,
        courseName: course.name,
        category: course.category,
        studentsCount: group.students_count ?? 0,
        teachers,
      } satisfies AdminGroupRowData & { courseId: number }
    })
  })

  const teacherOptions = Array.from(
    new Map(
      allGroups.flatMap((group) =>
        group.teachers.map((teacher) => [teacher.userId, teacher] as const),
      ),
    ).values(),
  ).toSorted((first, second) => {
    if (first.name && second.name) {
      return first.name.localeCompare(second.name, UKRAINIAN_LOCALE)
    }
    if (first.name) return -1
    if (second.name) return 1
    return first.userId - second.userId
  })

  const normalizedQuery = query.trim().toLocaleLowerCase(UKRAINIAN_LOCALE)
  const groups = allGroups
    .filter((group) => {
      if (courseFilter !== GROUP_FILTER_ALL && String(group.courseId) !== courseFilter) {
        return false
      }
      if (
        categoryFilter !== GROUP_FILTER_ALL &&
        group.category !== (categoryFilter as CourseCategoryKey)
      ) {
        return false
      }
      if (
        teacherFilter !== GROUP_FILTER_ALL &&
        !group.teachers.some((teacher) => String(teacher.userId) === teacherFilter)
      ) {
        return false
      }
      if (!normalizedQuery) return true
      if (group.name.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery)) return true
      if (group.courseName.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery))
        return true
      return group.teachers.some((teacher) => {
        if (!teacher.name) return false
        return teacher.name.toLocaleLowerCase(UKRAINIAN_LOCALE).includes(normalizedQuery)
      })
    })
    .toSorted((first, second) => {
      const courseOrder = first.courseName.localeCompare(second.courseName, UKRAINIAN_LOCALE)
      if (courseOrder !== 0) return courseOrder
      return first.name.localeCompare(second.name, UKRAINIAN_LOCALE)
    })

  const hasFilters =
    !!normalizedQuery ||
    courseFilter !== GROUP_FILTER_ALL ||
    categoryFilter !== GROUP_FILTER_ALL ||
    teacherFilter !== GROUP_FILTER_ALL

  const isCoursesPending = coursesQuery.isPending
  const isUsersPending = usersQuery.isPending
  const isGroupsPending = groupsQueries.some((groupsQuery) => groupsQuery.isPending)
  const isCoursesError = coursesQuery.isError
  const isUsersError = usersQuery.isError
  const isGroupsError = groupsQueries.some((groupsQuery) => groupsQuery.isError)

  let errorKey: AdminGroupsErrorKey = 'admin.groups.error'
  if (isCoursesError) errorKey = getAdminGroupsErrorKey(coursesQuery.error, 'admin.groups.error')
  if (isUsersError) errorKey = getAdminGroupsErrorKey(usersQuery.error, 'admin.groups.error')
  const groupsQueryError = groupsQueries.find((groupsQuery) => groupsQuery.isError)?.error
  if (isGroupsError) errorKey = getAdminGroupsErrorKey(groupsQueryError, 'admin.groups.error')

  return {
    state: {
      query,
      courseFilter,
      categoryFilter,
      teacherFilter,
      groups,
      courses: coursesQuery.data ?? [],
      teacherOptions,
      totalCount: allGroups.length,
      foundCount: groups.length,
      hasFilters,
      errorKey,
      isPending: isCoursesPending || isUsersPending || isGroupsPending,
      isError: isCoursesError || isUsersError || isGroupsError,
      isFetching:
        coursesQuery.isFetching ||
        usersQuery.isFetching ||
        groupsQueries.some((groupsQuery) => groupsQuery.isFetching),
    },
    queries: { courses: coursesQuery, users: usersQuery, groups: groupsQueries },
    functions: {
      handleQueryChange,
      handleCourseFilterChange,
      handleCategoryFilterChange,
      handleTeacherFilterChange,
      handleClearFilters,
      handleRetry,
    },
  }
}

function getAdminGroupsErrorKey(
  error: unknown,
  fallback: AdminGroupsErrorKey,
): AdminGroupsErrorKey {
  if (!ResponseError.is(error)) return fallback
  if (error.status === 401) return 'admin.groups.error.unauthorized'
  if (error.status === 403) return 'admin.groups.error.forbidden'
  return fallback
}
