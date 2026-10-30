import { ResponseError } from '#/api/.kubb/client'

export function isUnknownResultError(error: unknown) {
  if (!ResponseError.is(error)) return true
  if (error.status === 408) return true
  if (error.status >= 400 && error.status <= 499) return false
  return true
}
