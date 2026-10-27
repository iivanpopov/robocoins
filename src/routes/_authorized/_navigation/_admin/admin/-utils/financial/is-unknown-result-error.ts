import { ResponseError } from '#/api/.kubb/client'

export function isUnknownResultError(error: unknown) {
  if (!ResponseError.is(error)) return true
  if (error.status === 408) return true
  return error.status >= 500 && error.status <= 599
}
