import { DraftFunctions, type MessageFunction } from 'messageformat/functions'
import defaultFunctions from 'virtual:kanjou/functions'

import { AppLink } from '#/routes/-components/app-link'
import { formatCoinAmount } from '#/utils/coins'

const coins: MessageFunction<'coins', 'string'> = (context, options, operand: any) => {
  const input = defaultFunctions.number!(context, options, operand)
  const formatted = formatCoinAmount(Number(input!.valueOf!()), true)
  const number = defaultFunctions.number!(context, { maximumFractionDigits: 2 }, Number(formatted))
  const text = defaultFunctions.string!(context, {}, formatted)

  return { ...number, type: 'coins', toString: text.toString, toParts: text.toParts }
}

declare module '@kanjou/react' {
  export interface Register {
    functions: {
      coins: typeof coins
    }
  }
}

export const translationComponents = { br: () => <br />, a: AppLink }
export const translationFunctions = {
  ...DraftFunctions,
  coins,
}
