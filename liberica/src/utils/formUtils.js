import { createNumberMask } from 'redux-form-input-masks'

export const currencyMask = createNumberMask({
  prefix: '$',
  decimalPlaces: 2,
  locale: 'en-US',
  multiplier: 100
})

export const validateIsRequired = value => value ? undefined : 'Required'