import { createTranslate, createTranslateCache } from '@kanjou/core'
import { enrich, TranslateContext, type Locale, type Message } from '@kanjou/react'
import { DefaultFunctions, DraftFunctions, type MessageFunction } from 'messageformat/functions'
import { createContext, use, useMemo, type ReactNode } from 'react'

import { AppLink } from '#/routes/-components/app-link'
import { formatCoinAmount } from '#/utils/coins'

function createCoinNumber(omitLeadingZero: boolean): MessageFunction<'coins', 'string'> {
  return (context, options, operand) => {
    const input = DefaultFunctions.number(context, options, operand)
    const formatted = formatCoinAmount(Number(input.valueOf()), omitLeadingZero)
    const number = DefaultFunctions.number(context, { maximumFractionDigits: 2 }, Number(formatted))
    const text = DefaultFunctions.string(context, {}, formatted)

    return { ...number, type: 'coins', toString: text.toString, toParts: text.toParts }
  }
}

const coinNumber = createCoinNumber(false)
const compactCoinNumber = createCoinNumber(true)

interface TranslationMessages {
  locale: Locale
  messages: Readonly<Record<string, Message>>
  omitLeadingCoinZero: boolean
}

export interface TranslationProviderProps {
  locale?: Locale
  messages: Readonly<Record<string, Message>>
  children: ReactNode
  omitLeadingCoinZero?: boolean
}

const TranslationMessagesContext = createContext<TranslationMessages | null>(null)
const components = { br: () => <br />, a: AppLink }
const functions = { ...DefaultFunctions, ...DraftFunctions, coins: coinNumber }
const compactFunctions = { ...functions, coins: compactCoinNumber }

export function TranslationProvider({
  locale,
  messages,
  children,
  omitLeadingCoinZero,
}: TranslationProviderProps) {
  const parent = use(TranslationMessagesContext)
  const resolvedLocale = locale ?? parent?.locale ?? 'uk'

  const catalog = useMemo(
    () => ({
      locale: resolvedLocale,
      messages: { ...parent?.messages, ...messages },
      omitLeadingCoinZero: omitLeadingCoinZero ?? parent?.omitLeadingCoinZero ?? false,
    }),
    [resolvedLocale, parent, messages, omitLeadingCoinZero],
  )
  const translate = useMemo(
    () =>
      enrich(
        createTranslate({
          locale: catalog.locale,
          messages: catalog.messages,
          cache: createTranslateCache(),
          options: { functions: catalog.omitLeadingCoinZero ? compactFunctions : functions },
        }),
        components,
      ),
    [catalog],
  )

  return (
    <TranslationMessagesContext value={catalog}>
      <TranslateContext value={translate}>{children}</TranslateContext>
    </TranslationMessagesContext>
  )
}
