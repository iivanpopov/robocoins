import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { useGetCoursesCourseGet } from '#/api/hooks/useGetCoursesCourseGet'
import { parseGroupSchedule } from '#/routes/-utils'

import { GroupFilter } from '../-constants'

export function useGroupPage() {
  const navigate = useNavigate()
  const coursesQuery = useGetCoursesCourseGet()
  const [selectedTheme, setSelectedTheme] = useState<GroupFilter>(GroupFilter.All)

  function handleThemeSelect(theme: GroupFilter) {
    setSelectedTheme(theme)
  }

  function handleGroupClick(groupId: number) {
    void navigate({ to: '/group/$groupId', params: { groupId: String(groupId) } })
  }

  const groups = (coursesQuery.data ?? []).flatMap((course) =>
    (course.groups ?? []).map((group) => ({
      ...group,
      schedule: parseGroupSchedule(group.name),
      course_name: course.name,
      category: course.category,
      students_count: group.students_count ?? 0,
    })),
  )
  const categories = [...new Set(groups.map((group) => group.category))]
  const filteredGroups = groups.filter((group) => {
    if (selectedTheme === GroupFilter.All) return true
    return group.category === selectedTheme
  })

  return {
    state: {
      groups: filteredGroups,
      categories,
      selectedTheme,
      allGroupsCount: groups.length,
      isPending: coursesQuery.isPending,
      isError: coursesQuery.isError,
    },
    queries: { courses: coursesQuery },
    functions: { handleThemeSelect, handleGroupClick },
  }
}
