const coinFormatter = new Intl.NumberFormat('en-US', {
  useGrouping: false,
  maximumFractionDigits: 2,
  signDisplay: 'negative',
})

export function formatCoinAmount(amount: number, omitLeadingZero = false) {
  const formatted = coinFormatter.format(amount)

  if (omitLeadingZero) return formatted.replace(/^(-?)0\./, '$1.')

  return formatted
}
