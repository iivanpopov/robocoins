import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'

import { useGetStudentAchievementProgressStudentStudentIdAchievementsGet } from '#/api/hooks/useGetStudentAchievementProgressStudentStudentIdAchievementsGet'
import { Button, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import {
  AchievementArtwork,
  AchievementStatus,
} from '#/routes/_authorized/-components/achievements'
import {
  findNearestUnearnedAchievement,
  sortAchievementsByThreshold,
} from '#/routes/_authorized/-utils'

import styles from './achievements-preview.module.css'

const EARNED_PREVIEW_LIMIT = 3

export interface AchievementsPreviewProps {
  studentId: number
}

export function AchievementsPreview(props: AchievementsPreviewProps) {
  const t = useTranslate()

  const achievementsQuery = useGetStudentAchievementProgressStudentStudentIdAchievementsGet(
    { path: { student_id: props.studentId } },
    { query: { retry: false } },
  )

  function handleRetry() {
    void achievementsQuery.refetch()
  }

  const achievements = sortAchievementsByThreshold(achievementsQuery.data?.achievements ?? [])
  const earnedAchievements = achievements.filter((achievement) => achievement.earned)
  const earnedPreview = earnedAchievements.slice(0, EARNED_PREVIEW_LIMIT)
  const nearest = findNearestUnearnedAchievement(achievements)

  return (
    <section className={styles.preview} aria-labelledby="achievements-preview-title">
      <div className={styles.heading}>
        <h2 id="achievements-preview-title" className={styles.title}>
          {t('achievements.preview.title')}
        </h2>
        <Button
          variant="link"
          className={styles['all-button']}
          nativeButton={false}
          render={<Link to="/achievements" />}
        >
          {t('achievements.preview.all')}
          <span aria-hidden="true" className="i-ph:caret-right" />
        </Button>
      </div>

      {achievementsQuery.isPending && (
        <Loader grow role="status" aria-label={t('achievements.loading')} />
      )}

      {achievementsQuery.isError && (
        <InlineError onRetry={handleRetry} isRetrying={achievementsQuery.isFetching}>
          {t('achievements.error')}
        </InlineError>
      )}

      {achievementsQuery.isSuccess && !achievements.length && (
        <p className={styles.empty}>{t('achievements.empty')}</p>
      )}

      {achievementsQuery.isSuccess && !!achievements.length && (
        <>
          <p className={styles.summary}>
            {t('achievements.earned-count', {
              earned: earnedAchievements.length,
              total: achievements.length,
            })}
          </p>

          {!!earnedPreview.length && (
            <ul className={styles.earned} aria-label={t('achievements.preview.earned')}>
              {earnedPreview.map((achievement) => (
                <li key={achievement.id} className={styles.badge}>
                  <AchievementArtwork requiredCoins={achievement.required_coins} earned size="sm" />
                  <span className={styles['badge-body']}>
                    <span className={styles['badge-name']}>{achievement.name}</span>
                    {achievement.required_coins !== null && (
                      <span className={styles['badge-threshold']}>
                        {t('achievements.required', { count: achievement.required_coins })}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {nearest && (
            <div className={styles.target}>
              <AchievementArtwork requiredCoins={nearest.required_coins} earned={false} size="md" />
              <div className={styles['target-body']}>
                <strong className={styles['target-name']}>{nearest.name}</strong>
                <AchievementStatus
                  earned={nearest.earned}
                  progressPercent={nearest.progress_percent}
                  requiredCoins={nearest.required_coins}
                />
              </div>
            </div>
          )}

          {!nearest && <p className={styles.all}>{t('achievements.all-earned')}</p>}
        </>
      )}
    </section>
  )
}
