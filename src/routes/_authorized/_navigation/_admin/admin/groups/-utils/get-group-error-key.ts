import { ResponseError } from '#/api/.kubb/client'

import type { GroupErrorKey } from '../-types'

export function getGroupErrorKey(error: unknown, fallback: GroupErrorKey): GroupErrorKey {
  if (!ResponseError.is(error)) return fallback
  if (error.status === 401) return 'error.session'
  if (error.status === 403) return 'admin.groups.error.forbidden'
  return fallback
}

export function getGroupErrorStatus(error: unknown) {
  if (!ResponseError.is(error)) return null
  return error.status
}
