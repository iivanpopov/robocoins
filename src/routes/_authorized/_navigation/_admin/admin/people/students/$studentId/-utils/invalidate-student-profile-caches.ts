import type { QueryClient } from '@tanstack/react-query'

import { getStudentByIdStudentStudentIdGetQueryKey } from '#/api/hooks/useGetStudentByIdStudentStudentIdGet'

import { invalidateStudentCaches } from '../../-utils'

export function invalidateStudentProfileCaches(queryClient: QueryClient, studentId: number) {
  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: getStudentByIdStudentStudentIdGetQueryKey({ path: { student_id: studentId } }),
    }),
    invalidateStudentCaches(queryClient),
  ])
}
