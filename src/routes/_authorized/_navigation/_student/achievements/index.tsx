import { useTranslate } from '@kanjou/react'
import { Link, createFileRoute } from '@tanstack/react-router'

import { getStudentAchievementProgressStudentStudentIdAchievementsGetQueryOptions } from '#/api/hooks/useGetStudentAchievementProgressStudentStudentIdAchievementsGet'
import type { StudentProfileResponse } from '#/api/types'
import { IconButton, Loader } from '#/components/ui'
import { InlineError, PageLayout } from '#/routes/-components'
import { AchievementShowcaseItem } from '#/routes/_authorized/-components'

import { useAchievementsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_student/achievements/')({
  head: () => ({ meta: [{ title: 'Досягнення | Robocoins' }] }),
  loader: async ({ context }) => {
    const profile = context.user as StudentProfileResponse
    await context.queryClient
      .query(
        getStudentAchievementProgressStudentStudentIdAchievementsGetQueryOptions({
          path: { student_id: profile.id },
        }),
      )
      .catch(() => undefined)
  },
  component: AchievementsPage,
})

function AchievementsPage() {
  const { state, functions } = useAchievementsPage()

  const t = useTranslate()

  return (
    <PageLayout.Root variant="comfortable" render={<main />}>
      <PageLayout.Header align="end" centered>
        <IconButton nativeButton={false} render={<Link to="/" />} title={t('achievements.back')}>
          <span className="i-ph:arrow-left" aria-hidden="true" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('achievements.title')}</PageLayout.Title>
          <PageLayout.Description>{t('achievements.description')}</PageLayout.Description>
        </PageLayout.Heading>
      </PageLayout.Header>

      {state.isPending && <Loader grow role="status" aria-label={t('achievements.loading')} />}

      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isFetching}>
          {t('achievements.error')}
        </InlineError>
      )}

      {!state.isPending && !state.isError && !state.totalCount && (
        <p className={styles.notice}>{t('achievements.empty')}</p>
      )}

      {!state.isPending && !state.isError && !!state.totalCount && (
        <>
          <p className={styles.summary}>
            {t('achievements.earned-count', {
              earned: state.earnedCount,
              total: state.totalCount,
            })}
          </p>
          {state.earnedCount === state.totalCount && (
            <p className={styles.notice} role="status">
              {t('achievements.all-earned')}
            </p>
          )}
          <ul className={styles.grid}>
            {state.achievements.map((achievement) => (
              <li key={achievement.id}>
                <AchievementShowcaseItem achievement={achievement} />
              </li>
            ))}
          </ul>
        </>
      )}
    </PageLayout.Root>
  )
}
