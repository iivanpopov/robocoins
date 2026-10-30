import { formatCoinAmount } from '#/lib/coins'

export function formatSignedAmount(amount: number) {
  return `${amount < 0 ? '−' : '+'}${formatCoinAmount(Math.abs(amount))}`
}
