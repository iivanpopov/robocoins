import type { BalanceTransactionResponse } from '#/api/types'

export function getSignedAmount(transaction: BalanceTransactionResponse) {
  if (transaction.operation === 'deposit') return transaction.amount
  return -transaction.amount
}
