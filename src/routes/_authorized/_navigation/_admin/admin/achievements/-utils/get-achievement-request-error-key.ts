import { ResponseError } from '#/api/.kubb/client'

import type { AchievementErrorKey } from '../-types'

export function getAchievementRequestErrorKey(
  error: unknown,
  fallbackKey: AchievementErrorKey = 'admin.achievements.error.request',
): AchievementErrorKey {
  if (!ResponseError.is(error)) return fallbackKey
  if (error.status === 401) return 'error.session'
  if (error.status === 403) return 'admin.achievements.error.forbidden'
  if (error.status === 404) return 'admin.achievements.error.not-found'
  if (error.status === 422) return 'admin.achievements.error.validation'

  return fallbackKey
}
