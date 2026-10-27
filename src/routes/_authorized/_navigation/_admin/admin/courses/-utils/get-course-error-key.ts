import { ResponseError } from '#/api/.kubb/client'

import type { CourseErrorKey } from '../-types'

export function getCourseErrorKey(error: unknown, fallback: CourseErrorKey): CourseErrorKey {
  if (!ResponseError.is(error)) return fallback
  if (error.status === 401) return 'error.session'
  if (error.status === 403) return 'error.forbidden'
  return fallback
}
