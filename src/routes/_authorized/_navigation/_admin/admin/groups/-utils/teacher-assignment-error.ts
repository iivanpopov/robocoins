import { ResponseError } from '#/api/.kubb/client'

import type { GroupErrorKey } from '../-types'

const UNKNOWN_RESULT_STATUSES = [408, 429, 500, 502, 503, 504]

export function getTeacherAssignmentErrorStatus(error: unknown) {
  if (!ResponseError.is(error)) return null
  return error.status
}

export function isDefiniteTeacherAssignmentFailure(error: unknown) {
  const status = getTeacherAssignmentErrorStatus(error)
  if (status === null) return false
  return status >= 400 && status < 500 && !UNKNOWN_RESULT_STATUSES.includes(status)
}

export function getTeacherAssignmentErrorKey(
  error: unknown,
  fallback: GroupErrorKey,
): GroupErrorKey {
  if (!ResponseError.is(error)) return fallback
  if (error.status === 401) return 'admin.groups.error.unauthorized'
  if (error.status === 403) return 'admin.groups.error.forbidden'
  if (error.status === 422) return 'admin.groups.teachers.error.validation'
  if (isDefiniteTeacherAssignmentFailure(error)) return 'admin.groups.teachers.error.rejected'
  return 'admin.groups.teachers.error'
}
