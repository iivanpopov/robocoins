import { ResponseError } from '#/api/.kubb/client'

export function isMissingStreakResponse(error: unknown) {
  return ResponseError.is(error) && error.status === 404
}
