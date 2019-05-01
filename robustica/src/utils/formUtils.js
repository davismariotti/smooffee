import { createNumberMask } from 'redux-form-input-masks'

function isNormalInteger(str) {
  const n = Math.floor(Number(str))
  return n !== Infinity && String(n) === str && n >= 0
}

export const currencyMask = createNumberMask({
  prefix: '$',
  decimalPlaces: 2,
  locale: 'en-US',
  multiplier: 100
})

export const validateIsRequired = value => value ? undefined : 'Required'
export const validateMustBeInteger = value => value && !isNormalInteger(value) ? 'Must be a number' : undefined
export const validateStripeTokenPk = value => value && !value.startsWith('pk_') ? 'Must be a valid publishable key' : undefined
export const validateStripeTokenSk = value => value && !value.startsWith('sk_') ? 'Must be a valid secret key' : undefined