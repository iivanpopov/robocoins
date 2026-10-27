import {
  getApiErrorKind,
  isRetryableFinancialError,
  isUnknownResultError,
} from '#/routes/_authorized/_navigation/_admin/admin/-utils'

import { getOperationErrorKey } from './get-operation-error-key'

export function getFinancialFailureOutcome(error: unknown) {
  const isUnknown = isUnknownResultError(error)

  return {
    isUnknown,
    isRetryable: isRetryableFinancialError(error),
    errorKind: getApiErrorKind(error),
    errorKey: getOperationErrorKey(error, 'admin.operations.result.error'),
  }
}
