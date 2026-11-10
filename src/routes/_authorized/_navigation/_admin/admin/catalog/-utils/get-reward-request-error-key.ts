import { ResponseError } from '#/api/.kubb/client'

import type { CatalogErrorKey } from '../-types'

export function getRewardRequestErrorKey(
  error: unknown,
  fallbackKey: CatalogErrorKey = 'admin.catalog.error.request',
): CatalogErrorKey {
  if (!ResponseError.is(error)) return fallbackKey
  if (error.status === 401) return 'error.session'
  if (error.status === 403) return 'admin.catalog.error.forbidden'
  if (error.status === 404) return 'admin.catalog.error.not-found'
  if (error.status === 422) return 'admin.catalog.error.validation'

  return fallbackKey
}
