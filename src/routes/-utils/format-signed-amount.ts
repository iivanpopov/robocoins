export function formatSignedAmount(amount: number) {
  const magnitude = String(Math.abs(amount))
  const value = magnitude.startsWith('0.') ? magnitude.slice(1) : magnitude
  return `${amount < 0 ? '−' : '+'}${value}`
}
