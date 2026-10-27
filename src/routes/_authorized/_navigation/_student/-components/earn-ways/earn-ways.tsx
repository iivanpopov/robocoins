import { useTranslate } from '@kanjou/react'

import { useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'

import { ReasonIcon } from '../reason-icon'
import { RulesDrawer } from '../rules-drawer'

import styles from './earn-ways.module.css'

const WAYS_LIMIT = 3

export function EarnWays() {
  const t = useTranslate()
  const reasonsQuery = useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet()
  const ways = (reasonsQuery.data?.reasons ?? [])
    .filter((item) => item.type === 'reward')
    .slice(0, WAYS_LIMIT)

  if (!ways.length) return null

  return (
    <section className={styles.section} aria-labelledby="earn-ways-title">
      <div className={styles.heading}>
        <h2 id="earn-ways-title" className={styles.title}>
          {t('profile.earn.title')}
        </h2>
        <RulesDrawer className={styles.all} />
      </div>
      <ul className={styles.list}>
        {ways.map((way) => (
          <li key={way.reason} className={styles.row}>
            <span className={styles.icon}>
              <ReasonIcon reason={way.reason} />
            </span>
            <span className={styles.label}>
              {t.unsafe(`reason.${way.reason}`, { fallback: way.reason })}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
