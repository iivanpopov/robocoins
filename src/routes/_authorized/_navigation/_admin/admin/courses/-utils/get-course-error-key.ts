import { ResponseError } from '#/api/.kubb/client'

import type { CourseErrorKey } from '../-types'

export function getCourseErrorKey(error: unknown, fallback: CourseErrorKey): CourseErrorKey {
  if (!ResponseError.is(error)) return fallback
  if (error.status === 401) return 'admin.courses.error.unauthorized'
  if (error.status === 403) return 'admin.courses.error.forbidden'
  return fallback
}
