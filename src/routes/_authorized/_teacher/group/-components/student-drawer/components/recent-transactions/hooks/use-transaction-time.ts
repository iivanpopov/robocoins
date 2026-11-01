import { useTranslate } from '@kanjou/react'
import { useState } from 'react'

import { useCurrentTime } from '#/hooks'

import { getTransactionTime } from '../-utils'

export function useTransactionTime(createdAt: string) {
  const t = useTranslate()

  const [initialTime] = useState(Date.now)
  const now = useCurrentTime(initialTime)

  function getLabel() {
    const time = getTransactionTime(createdAt, now)

    if (time.kind === 'today') return t('award.history.time.today')
    if (time.kind === 'yesterday') return t('award.history.time.yesterday')
    if (time.kind === 'date') {
      return t.date(new Date(createdAt), {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Europe/Kyiv',
      })
    }
    if (!time.minutes) return t('award.history.time.now')
    if (time.minutes < 60) return t.relative(-time.minutes, 'minute', { numeric: 'always' })
    if (time.minutes === 60) return t.relative(-1, 'hour', { numeric: 'always' })

    return t('award.history.time.hour-minutes', { minutes: time.minutes - 60 })
  }

  return { label: getLabel() }
}
