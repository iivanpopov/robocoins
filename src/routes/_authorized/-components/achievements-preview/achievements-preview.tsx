import { useRender } from '@base-ui/react/use-render'
import { useTranslate } from '@kanjou/react'
import { Link } from '@tanstack/react-router'
import type { ComponentProps } from 'react'

import { useGetStudentAchievementProgressStudentStudentIdAchievementsGet } from '#/api/hooks/useGetStudentAchievementProgressStudentStudentIdAchievementsGet'
import { Button, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { AchievementArtwork } from '#/routes/_authorized/-components/achievements'
import { sortAchievementsForShowcase } from '#/routes/_authorized/-utils'
import { cn } from '#/utils/cn'

import styles from './achievements-preview.module.css'

export interface AchievementsPreviewRootProps extends useRender.ComponentProps<'section'> {
  variant?: 'preview' | 'profile'
}

export interface AchievementsPreviewContentProps {
  studentId: number
  limit?: number
}

function Root(props: AchievementsPreviewRootProps) {
  const elementProps = { ...props }
  delete elementProps.variant
  delete elementProps.render

  return useRender({
    defaultTagName: 'section',
    render: props.render,
    props: {
      ...elementProps,
      className: cn(styles.preview, props.variant === 'profile' && styles.profile, props.className),
    },
  })
}

function Header(props: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.heading, props.className)} />
}

function Title(props: ComponentProps<'h2'>) {
  return <h2 {...props} className={cn(styles.title, props.className)} />
}

function AllLink() {
  const t = useTranslate()

  return (
    <Button
      variant="link"
      className={styles['all-button']}
      nativeButton={false}
      render={<Link to="/achievements" />}
    >
      {t('achievements.preview.all')}
      <span aria-hidden="true" className="i-ph:caret-right" />
    </Button>
  )
}

function Content(props: AchievementsPreviewContentProps & { layout: 'preview' | 'collection' }) {
  const t = useTranslate()

  const achievementsQuery = useGetStudentAchievementProgressStudentStudentIdAchievementsGet(
    { path: { student_id: props.studentId } },
    { query: { retry: false } },
  )

  function handleRetry() {
    void achievementsQuery.refetch()
  }

  const achievements = sortAchievementsForShowcase(achievementsQuery.data?.achievements ?? [])
  const earnedAchievements = achievements.filter((achievement) => achievement.earned)
  const visibleAchievements =
    props.layout === 'collection' ? achievements : earnedAchievements.slice(0, props.limit)

  return (
    <>
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

          {!!visibleAchievements.length && (
            <ul className={styles.earned}>
              {visibleAchievements.map((achievement) => (
                <li
                  key={achievement.id}
                  className={styles.badge}
                  data-earned={achievement.earned}
                  title={achievement.description}
                >
                  <AchievementArtwork
                    requiredCoins={achievement.required_coins}
                    earned={achievement.earned}
                    size="md"
                  />
                  <span className={styles['badge-name']}>{achievement.name}</span>
                  <span className="sr-only">
                    {achievement.earned && t('achievements.earned')}
                    {!achievement.earned && t('achievements.locked')}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {!earnedAchievements.length && props.layout === 'preview' && (
            <p className={styles.empty}>{t('achievements.locked')}</p>
          )}
        </>
      )}
    </>
  )
}

function Preview(props: AchievementsPreviewContentProps) {
  return <Content studentId={props.studentId} limit={props.limit} layout="preview" />
}

function Collection(props: Pick<AchievementsPreviewContentProps, 'studentId'>) {
  return <Content studentId={props.studentId} layout="collection" />
}

export const AchievementsPreview = { Root, Header, Title, AllLink, Preview, Collection }
