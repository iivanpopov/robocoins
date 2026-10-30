import type { QueryClient } from '@tanstack/react-query'

import { getAllStudentsStudentGetQueryKey } from '#/api/hooks/useGetAllStudentsStudentGet'
import { getCoursesCourseGetQueryKey } from '#/api/hooks/useGetCoursesCourseGet'
import { getTeacherGroupsTeacherGroupsGetQueryKey } from '#/api/hooks/useGetTeacherGroupsTeacherGroupsGet'

export function invalidateStudentCaches(queryClient: QueryClient) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: getAllStudentsStudentGetQueryKey() }),
    queryClient.invalidateQueries({ queryKey: getCoursesCourseGetQueryKey() }),
    queryClient.invalidateQueries({ queryKey: getTeacherGroupsTeacherGroupsGetQueryKey() }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/group/id/:group_id' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/group/course/:course_id' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/group/name/:name' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/teacher/course/:course_id/groups' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/course/category/:category' }] }),
  ])
}
