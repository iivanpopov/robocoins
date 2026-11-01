import { createTranslate, createTranslateCache } from '@kanjou/core'
import { enrich, TranslateContext, type Locale, type Message } from '@kanjou/react'
import { DefaultFunctions, DraftFunctions } from 'messageformat/functions'
import { createContext, use, useMemo, type ReactNode } from 'react'

import { AppLink } from '#/routes/-components/app-link'

import { coinNumber, compactCoinNumber } from './coin-number'
import { mergeMessages } from './merge-messages'

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
      messages: mergeMessages([parent?.messages ?? {}, messages]),
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
