import type { BalanceTransactionResponse } from '#/api/types'

const CANCEL_WINDOW_IN_MS = 24 * 60 * 60 * 1000

export function isTransactionCancellable(
  transaction: BalanceTransactionResponse,
  enabled: boolean,
) {
  return (
    enabled &&
    !transaction.cancelled_at &&
    Date.now() - new Date(transaction.created_at).getTime() <= CANCEL_WINDOW_IN_MS
  )
}
