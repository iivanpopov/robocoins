import { TARIFF_INPUT_MAX_LENGTH } from '../../-constants'

const TARIFF_VALUE_PATTERN = /^\d+([.,]\d{1,2})?$/

export function isValidTariffValue(value: string) {
  if (!value) return true
  if (value.length > TARIFF_INPUT_MAX_LENGTH) return false
  return TARIFF_VALUE_PATTERN.test(value)
}

export function getInvalidTariffReasonKeys(tariffs: Record<string, string>) {
  return Object.entries(tariffs)
    .filter(([, value]) => !isValidTariffValue(value))
    .map(([reason]) => reason)
}
