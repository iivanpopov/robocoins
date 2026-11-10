import { useTranslate } from '@kanjou/react'

import { cn } from '#/utils/cn'

import { useLessonRewards } from './hooks'

import styles from './lesson-rewards.module.css'

const REASON_ICONS: Record<string, string> = {
  theory: 'i-ph:book-open',
  practice_completed: 'i-ph:wrench',
  additional_task_completed: 'i-ph:lightning',
  activity: 'i-ph:hand',
  answer: 'i-ph:chat-circle',
  homework: 'i-ph:house',
  initiative: 'i-ph:lightbulb',
  teamwork: 'i-ph:users',
}

interface LessonRewardsProps {
  studentId: number
  now: number
}

export function LessonRewards(props: LessonRewardsProps) {
  const lessonRewards = useLessonRewards(props)
  const t = useTranslate()

  if (lessonRewards.isError) {
    return <span className={styles.error}>{t('group.rewards.error')}</span>
  }

  if (!lessonRewards.rewards.length) return null

  return (
    <span className={styles.root}>
      {lessonRewards.rewards.map((reward) => {
        const label = t('group.rewards.detail', {
          reason: t.unsafe(`reason.${reward.reason}`),
          count: reward.count,
          date: new Date(reward.latest),
        })

        return (
          <span
            key={reward.reason}
            className={styles.reward}
            title={label}
            role="img"
            aria-label={label}
          >
            <span
              aria-hidden="true"
              className={cn(
                REASON_ICONS[reward.reason] ?? 'i-ph:star',
                styles.icon,
                styles[reward.recency],
              )}
            />
            <span aria-hidden="true">{reward.count}</span>
          </span>
        )
      })}
    </span>
  )
}
