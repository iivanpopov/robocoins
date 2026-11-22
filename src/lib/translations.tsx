import type { Functions } from '@kanjou/react'
import {
  DraftFunctions,
  type DefaultFunctions,
  type MessageFunction,
} from 'messageformat/functions'
import defaultFunctions from 'virtual:kanjou/functions'

import { AppLink } from '#/routes/-components/app-link'
import { formatCoinAmount } from '#/utils/coins'

const coinFormatters = defaultFunctions as Pick<typeof DefaultFunctions, 'number' | 'string'>

function createCoinNumber(omitLeadingZero: boolean): MessageFunction<'coins', 'string'> {
  return (context, options, operand) => {
    const input = coinFormatters.number(context, options, operand)
    const formatted = formatCoinAmount(Number(input.valueOf()), omitLeadingZero)
    const number = coinFormatters.number(context, { maximumFractionDigits: 2 }, Number(formatted))
    const text = coinFormatters.string(context, {}, formatted)

    return { ...number, type: 'coins', toString: text.toString, toParts: text.toParts }
  }
}

function defineCustomFunctions<CustomFunctions extends Record<string, MessageFunction<string>>>(
  functions: CustomFunctions,
) {
  return functions as CustomFunctions & Functions
}

export const translationComponents = { br: () => <br />, a: AppLink }
export const translationFunctions = defineCustomFunctions({
  date: DraftFunctions.date,
  datetime: DraftFunctions.datetime,
  coins: createCoinNumber(false),
})
export const compactTranslationFunctions = defineCustomFunctions({ coins: createCoinNumber(true) })
