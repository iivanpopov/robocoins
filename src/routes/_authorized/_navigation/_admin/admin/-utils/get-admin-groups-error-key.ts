import { ResponseError } from '#/api/.kubb/client'

import type { AdminGroupsErrorKey } from '../-types'

export function getAdminGroupsErrorKey(
  error: unknown,
  fallback: AdminGroupsErrorKey,
): AdminGroupsErrorKey {
  if (!ResponseError.is(error)) return fallback
  if (error.status === 401) return 'error.session'
  if (error.status === 403) return 'admin.groups.error.forbidden'
  return fallback
}
