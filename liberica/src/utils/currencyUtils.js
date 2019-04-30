export function formatCurrency(amount) {
  return `$${(amount / 100).toFixed(2)}`
}
