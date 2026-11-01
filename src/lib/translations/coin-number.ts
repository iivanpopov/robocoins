import { DefaultFunctions, type MessageFunction } from 'messageformat/functions'

import { formatCoinAmount } from '#/lib/coins'

function createCoinNumber(omitLeadingZero: boolean): MessageFunction<'coins', 'string'> {
  return (context, options, operand) => {
    const input = DefaultFunctions.number(context, options, operand)
    const formatted = formatCoinAmount(Number(input.valueOf()), omitLeadingZero)
    const number = DefaultFunctions.number(context, { maximumFractionDigits: 2 }, Number(formatted))
    const text = DefaultFunctions.string(context, {}, formatted)

    return { ...number, type: 'coins', toString: text.toString, toParts: text.toParts }
  }
}

export const coinNumber = createCoinNumber(false)
export const compactCoinNumber = createCoinNumber(true)
