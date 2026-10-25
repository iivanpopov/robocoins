import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { useGetTeacherGroupsTeacherGroupsGet } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'
import { isGroupScheduleActive, parseGroupSchedule } from '#/routes/-utils'

import { GroupFilter } from '../-constants'

export function useGroupPage() {
  const navigate = useNavigate()

  const [selectedTheme, setSelectedTheme] = useState<GroupFilter>(GroupFilter.All)
  const [now, setNow] = useState<Date | null>(null)

  const coursesQuery = useGetCoursesCourseGet()
  const teacherGroupsQuery = useGetTeacherGroupsTeacherGroupsGet()

  useEffect(() => {
    const minuteInMilliseconds = 60_000
    let timeout: ReturnType<typeof setTimeout>

    function handleClockUpdate() {
      clearTimeout(timeout)
      setNow(new Date())
      timeout = setTimeout(
        handleClockUpdate,
        minuteInMilliseconds - (Date.now() % minuteInMilliseconds),
      )
    }

    handleClockUpdate()
    window.addEventListener('focus', handleClockUpdate)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('focus', handleClockUpdate)
    }
  }, [])

  function handleThemeSelect(theme: GroupFilter) {
    setSelectedTheme(theme)
  }

  function handleGroupClick(groupId: number) {
    void navigate({ to: '/group/$groupId', params: { groupId: String(groupId) } })
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
        isActive: isGroupScheduleActive(schedule, now),
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
      categories,
      selectedTheme,
      allGroupsCount: groups.length,
      isPending: coursesQuery.isPending || teacherGroupsQuery.isPending,
      isError: coursesQuery.isError || teacherGroupsQuery.isError,
      isRetrying: coursesQuery.isFetching || teacherGroupsQuery.isFetching,
    },
    queries: { courses: coursesQuery, teacherGroups: teacherGroupsQuery },
    functions: { handleThemeSelect, handleGroupClick, handleRetry },
  }
}
