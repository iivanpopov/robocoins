import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { useGetDailyTaskDailyStudentIdDailyTaskGet } from '#/api/hooks/useGetDailyTaskDailyStudentIdDailyTaskGet'
import { useGetStudentStreakStudentStudentIdStreakGet } from '#/api/hooks/useGetStudentStreakStudentStudentIdStreakGet'
import { getStreakDays } from '#/routes/_authorized/-utils'

import { MissionWeek } from './components'

import styles from './daily-mission.module.css'

export function DailyMission({ studentId }: { studentId: number }) {
  const t = useTranslate()
  const taskQuery = useGetDailyTaskDailyStudentIdDailyTaskGet(
    { path: { student_id: studentId } },
    { query: { retry: false, staleTime: 0, refetchOnMount: false } },
  )
  const streakQuery = useGetStudentStreakStudentStudentIdStreakGet(
    { path: { student_id: studentId } },
    { query: { retry: false, staleTime: 0, refetchOnMount: false } },
  )

  const isCompleted = Boolean(taskQuery.data?.completed_at)
  const reward = taskQuery.data?.reward
  const streak = !streakQuery.isError ? streakQuery.data : undefined
  const task = !taskQuery.isError ? taskQuery.data : undefined
  const streakDays = Math.max(getStreakDays(streak, task?.date), isCompleted ? 1 : 0)

  return (
    <section className={styles.mission} aria-labelledby="daily-mission-title">
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 id="daily-mission-title" className={styles.title}>
            {t('daily-mission.title')}
          </h2>
          {(streak || isCompleted) && (
            <p className={styles.streak} data-inactive={!isCompleted}>
              <span className="i-ph:flame-bold" aria-hidden="true" />
              <strong>{t('daily-mission.streak', { count: streakDays })}</strong>
            </p>
          )}
        </div>
        {reward !== undefined && (
          <p className={styles.reward} data-inactive={!isCompleted}>
            <strong className={styles['reward-amount']}>
              {t('daily-mission.reward.amount', { count: reward })}
            </strong>
            <span aria-hidden="true" className={cn('i-ph:coin', styles['reward-coin'])} />
            <span className={styles['reward-unit']}>{t('coins.unit', { count: reward })}</span>
          </p>
        )}
        {!isCompleted && taskQuery.isPending && (
          <span className={styles.details}>{t('daily-mission.loading')}</span>
        )}
        {!isCompleted && taskQuery.isError && (
          <span className={styles.details}>{t('daily-mission.error')}</span>
        )}
      </div>
      <MissionWeek task={task} streak={streak} />
    </section>
  )
}
