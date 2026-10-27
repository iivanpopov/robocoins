import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { Mascot } from '#/components/mascot'

import { ReasonIcon } from '../reason-icon'
import { RulesDrawer } from '../rules-drawer'

import styles from './earn-ways.module.css'

const WAYS_LIMIT = 3

const WAY_TONES: Record<string, string> = {
  theory: styles.theory,
  practice_completed: styles.practice,
  additional_task_completed: styles.additional,
}

const WAY_DESCRIPTIONS: Record<string, string> = {
  theory: 'profile.earn.theory',
  practice_completed: 'profile.earn.practice',
  additional_task_completed: 'profile.earn.additional',
  activity: 'profile.earn.activity',
  homework: 'profile.earn.homework',
  teamwork: 'profile.earn.teamwork',
  answer: 'profile.earn.answer',
  initiative: 'profile.earn.initiative',
}

export function EarnWays() {
  const t = useTranslate()
  const reasonsQuery = useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet()
  const ways = (reasonsQuery.data?.reasons ?? [])
    .filter((item) => item.type === 'reward')
    .slice(0, WAYS_LIMIT)

  if (!ways.length) return null

  return (
    <section className={styles.section} aria-labelledby="earn-ways-title">
      <Mascot mood="explaining" size={64} alt="" aria-hidden="true" className={styles.helper} />
      <h2 id="earn-ways-title" className={styles.title}>
        {t('profile.earn.title')}
      </h2>
      <ul className={styles.list}>
        {ways.map((way) => (
          <li key={way.reason} className={styles.row}>
            <span className={cn(styles.icon, WAY_TONES[way.reason])}>
              <ReasonIcon reason={way.reason} />
            </span>
            <span className={styles.body}>
              <span className={styles.label}>
                {t.unsafe(`reason.${way.reason}`, { fallback: way.reason })}
              </span>
              {WAY_DESCRIPTIONS[way.reason] && (
                <span className={styles.description}>{t.unsafe(WAY_DESCRIPTIONS[way.reason])}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <RulesDrawer className={styles.all} />
    </section>
  )
}
