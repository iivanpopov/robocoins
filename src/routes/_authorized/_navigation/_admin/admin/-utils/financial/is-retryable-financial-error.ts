import { ResponseError } from '#/api/.kubb/client'

import { isUnknownResultError } from './is-unknown-result-error'

const RETRYABLE_STATUSES = [400, 409, 422, 429]

export function isRetryableFinancialError(error: unknown) {
  if (!ResponseError.is(error)) return false
  if (isUnknownResultError(error)) return false
  return RETRYABLE_STATUSES.includes(error.status)
}
