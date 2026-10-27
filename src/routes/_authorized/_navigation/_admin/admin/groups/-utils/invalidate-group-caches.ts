import type { QueryClient } from '@tanstack/react-query'

import { getCoursesCourseGetQueryKey } from '#/api/hooks/useGetCoursesCourseGet'
import { getUsersUsersGetQueryKey } from '#/api/hooks/useGetUsersUsersGet'

export function invalidateGroupCaches(queryClient: QueryClient) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: getCoursesCourseGetQueryKey() }),
    queryClient.invalidateQueries({ queryKey: getUsersUsersGetQueryKey() }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/group/course/:course_id' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/group/id/:group_id' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/course/category/:category' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/teacher/:teacher_id' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/teacher/groups' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/teacher/course/:course_id/groups' }] }),
  ])
}
