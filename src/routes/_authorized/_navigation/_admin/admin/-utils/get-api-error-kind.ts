import { ResponseError } from '#/api/.kubb/client'

export type ApiErrorKind = 'session' | 'forbidden' | 'other'

export function getApiErrorKind(error: unknown): ApiErrorKind {
  if (!ResponseError.is(error)) return 'other'
  if (error.status === 401) return 'session'
  if (error.status === 403) return 'forbidden'
  return 'other'
}
