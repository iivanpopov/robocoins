import type { QueryClient } from '@tanstack/react-query'

import { getCoursesCourseGetQueryKey } from '#/api/hooks/useGetCoursesCourseGet'

export function invalidateGroupCaches(queryClient: QueryClient) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: getCoursesCourseGetQueryKey() }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/group/course/:course_id' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/group/id/:group_id' }] }),
    queryClient.invalidateQueries({ queryKey: [{ url: '/course/category/:category' }] }),
  ])
}
