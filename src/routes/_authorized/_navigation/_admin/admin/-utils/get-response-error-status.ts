import { ResponseError } from '#/api/.kubb/client'

export function getResponseErrorStatus(error: unknown) {
  if (!ResponseError.is(error)) return null
  return error.status
}
