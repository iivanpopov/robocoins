import { useLoaderData } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { useGetTeacherGroupsTeacherGroupsGet } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import { useCurrentTime } from '#/hooks'
import { isGroupScheduleActive, parseGroupSchedule } from '#/routes/-utils'

import { GroupFilter } from '../-constants'

export function useGroupPage() {
  const loaderData = useLoaderData({ from: '/_authorized/_navigation/_teacher/group/' })

  const [selectedTheme, setSelectedTheme] = useState<GroupFilter>(GroupFilter.All)
  const now = useCurrentTime(loaderData.now)

  const coursesQuery = useGetCoursesCourseGet()
  const teacherGroupsQuery = useGetTeacherGroupsTeacherGroupsGet()

  function handleThemeSelect(theme: GroupFilter) {
    setSelectedTheme(theme)
  }

  function handleRetry() {
    if (coursesQuery.isError && !coursesQuery.isFetching) void coursesQuery.refetch()
    if (teacherGroupsQuery.isError && !teacherGroupsQuery.isFetching)
      void teacherGroupsQuery.refetch()
  }

  const groups = (teacherGroupsQuery.data ?? []).flatMap((group) => {
    const course = coursesQuery.data?.find((course) => course.id === group.course_id)
    if (!course) return []
    const schedule = parseGroupSchedule(group.name)

    return [
      {
        ...group,
        schedule,
        isActive: isGroupScheduleActive(schedule, new Date(now)),
        course_name: course.name,
        category: course.category,
        students_count: group.students_count ?? 0,
      },
    ]
  })
  const categories = [...new Set(groups.map((group) => group.category))]
  const filteredGroups = groups
    .filter((group) => {
      if (selectedTheme === GroupFilter.All) return true
      return group.category === selectedTheme
    })
    .toSorted((first, second) => Number(second.isActive) - Number(first.isActive))

  return {
    state: {
      groups: filteredGroups,
      hasMultipleActiveGroups: filteredGroups.filter((group) => group.isActive).length > 1,
      categories,
      selectedTheme,
      allGroupsCount: groups.length,
      isPending: coursesQuery.isPending || teacherGroupsQuery.isPending,
      isError: coursesQuery.isError || teacherGroupsQuery.isError,
      isRetrying: coursesQuery.isFetching || teacherGroupsQuery.isFetching,
    },
    queries: { courses: coursesQuery, teacherGroups: teacherGroupsQuery },
    functions: { handleThemeSelect, handleRetry },
  }
}
