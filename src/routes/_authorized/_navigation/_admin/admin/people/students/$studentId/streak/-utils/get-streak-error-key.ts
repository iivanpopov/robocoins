import { ResponseError } from '#/api/.kubb/client'

import type { StreakErrorKey } from '../-types'

export function getStreakErrorKey(error: unknown, fallback: StreakErrorKey): StreakErrorKey {
  if (!ResponseError.is(error)) return fallback
  if (error.status === 401) return 'error.session'
  if (error.status === 403) return 'admin.streak.error.forbidden'
  if (error.status === 404) return 'admin.streak.error.not-found'
  if (error.status === 422) return 'admin.streak.error.validation'

  return fallback
}
