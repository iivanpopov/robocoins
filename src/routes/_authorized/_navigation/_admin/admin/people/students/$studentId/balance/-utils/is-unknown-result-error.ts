import { ResponseError } from '#/api/.kubb/client'

const UNKNOWN_RESULT_STATUSES = [408, 500, 502, 503, 504]

export function isUnknownResultError(error: unknown) {
  if (!ResponseError.is(error)) return true
  return UNKNOWN_RESULT_STATUSES.includes(error.status)
}
