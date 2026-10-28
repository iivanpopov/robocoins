import { DefaultFunctions, type MessageFunction } from 'messageformat/functions'

import { formatCoinAmount } from '#/lib/coins'

export const coinNumber: MessageFunction<'coins', 'string'> = (context, options, operand) => {
  const input = DefaultFunctions.number(context, options, operand)
  const formatted = formatCoinAmount(Number(input.valueOf()))
  const number = DefaultFunctions.number(context, { maximumFractionDigits: 2 }, Number(formatted))
  const text = DefaultFunctions.string(context, {}, formatted)

  return { ...number, type: 'coins', toString: text.toString, toParts: text.toParts }
}
