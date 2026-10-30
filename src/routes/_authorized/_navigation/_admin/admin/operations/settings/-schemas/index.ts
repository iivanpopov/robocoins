import * as v from 'valibot'

import { isValidTariffValue } from '../-utils'
import {
  AMOUNT_INPUT_MAX_LENGTH,
  EXPLANATION_MAX_LENGTH,
  EXPLANATION_MIN_LENGTH,
  TARIFF_INPUT_MAX_LENGTH,
} from '../../-constants'

const AmountPattern = /^\d+([.,]\d{1,2})?$/

export const CorrectionStateSchema = v.object({
  studentId: v.pipe(v.string(), v.regex(/^\d+$/)),
  amount: v.pipe(
    v.string(),
    v.trim(),
    v.maxLength(AMOUNT_INPUT_MAX_LENGTH),
    v.regex(AmountPattern),
    v.check((value) => Number(value.replace(',', '.')) > 0),
  ),
  explanation: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(EXPLANATION_MIN_LENGTH),
    v.maxLength(EXPLANATION_MAX_LENGTH),
  ),
})

export const TariffStateSchema = v.object({
  tariffs: v.record(
    v.string(),
    v.pipe(
      v.string(),
      v.trim(),
      v.maxLength(TARIFF_INPUT_MAX_LENGTH),
      v.check((value) => isValidTariffValue(value)),
    ),
  ),
})
