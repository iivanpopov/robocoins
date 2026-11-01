import { formatCoinAmount } from '#/lib/coins'

export function formatSignedAmount(amount: number, omitLeadingZero = false) {
  return `${amount < 0 ? '−' : '+'}${formatCoinAmount(Math.abs(amount), omitLeadingZero)}`
}
