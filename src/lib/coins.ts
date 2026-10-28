const coinFormatter = new Intl.NumberFormat('en-US', {
  useGrouping: false,
  maximumFractionDigits: 2,
  signDisplay: 'negative',
})

export function formatCoinAmount(amount: number) {
  return coinFormatter.format(amount)
}
