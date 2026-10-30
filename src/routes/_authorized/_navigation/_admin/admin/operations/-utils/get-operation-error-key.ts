import { ResponseError } from '#/api/.kubb/client'

export function getOperationErrorKey(error: unknown, fallback: string) {
  if (!ResponseError.is(error)) return fallback
  if (error.status === 401) return 'error.session'
  if (error.status === 403) return 'admin.operations.result.error.forbidden'
  if (error.status === 404) return 'students.not-found'
  if (error.status === 409) return 'admin.operations.result.error.conflict'
  if (error.status === 422) return 'admin.operations.result.error.validation'
  return fallback
}
