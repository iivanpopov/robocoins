import { ResponseError } from '#/api/.kubb/client'

import { isUnknownResultError } from './is-unknown-result-error'

const NON_RETRYABLE_STATUSES = [401, 403, 404]

export function isRetryableFinancialError(error: unknown) {
  if (isUnknownResultError(error)) return false
  if (!ResponseError.is(error)) return false
  return !NON_RETRYABLE_STATUSES.includes(error.status)
}
