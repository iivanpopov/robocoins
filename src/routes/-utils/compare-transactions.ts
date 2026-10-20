import type { BalanceTransactionResponse } from '#/api/types'

export function compareTransactionsByNewest(
  first: BalanceTransactionResponse,
  second: BalanceTransactionResponse,
) {
  return Date.parse(second.created_at) - Date.parse(first.created_at)
}
