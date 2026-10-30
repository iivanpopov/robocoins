import { useTranslate } from '@kanjou/react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { cn } from 'cn'

import { getDailyTaskDailyStudentIdDailyTaskGetQueryOptions } from '#/api/hooks/useGetDailyTaskDailyStudentIdDailyTaskGet'
import type { StudentProfileResponse } from '#/api/types'
import { Mascot } from '#/components/mascot'
import { Button, IconButton, Input, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { PageLayout } from '#/routes/-components/page-layout'
import { getHomePath } from '#/routes/-utils'
import { SpaceBackground } from '#/routes/_authorized/-components/space-background'

import { AnswerPortal } from './-components'
import { useDailyMissionPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/daily-mission/')({
  head: () => ({ meta: [{ title: 'Місія дня | Robocoins' }] }),
  beforeLoad: ({ context }) => {
    if (context.user && context.user.role !== 'student') {
      throw redirect({ to: getHomePath(context.user.role) })
    }
  },
  loader: async ({ context }) => {
    const profile = context.user as StudentProfileResponse
    return Promise.all([
      context.queryClient
        .query({
          ...getDailyTaskDailyStudentIdDailyTaskGetQueryOptions({
            path: { student_id: profile.id },
          }),
          retry: false,
          staleTime: 0,
        })
        .catch(() => undefined),
    ])
  },
  component: DailyMissionPage,
})

function DailyMissionPage() {
  const { state, queries, mutations, functions } = useDailyMissionPage()
  const t = useTranslate()

  return (
    <PageLayout.Root render={<main />} className={cn('student', styles.page)}>
      <PageLayout.Header align="end" centered className={styles.header}>
        <IconButton onClick={functions.handleHome} title={t('navigation.home')}>
          <span className="i-ph:arrow-left" aria-hidden="true" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('daily-mission.title')}</PageLayout.Title>
        </PageLayout.Heading>
      </PageLayout.Header>
      <div className={styles.scene}>
        <SpaceBackground className={styles.space} />
        <div className={styles.content}>
          {queries.task.isPending && (
            <Loader grow role="status" aria-label={t('daily-mission.loading')} />
          )}
          {queries.task.isError && !state.isCompleted && (
            <InlineError onRetry={functions.handleRetry} isRetrying={queries.task.isFetching}>
              {t('daily-mission.task.error')}
            </InlineError>
          )}
          {state.isCompleted && (
            <section className={styles.success} aria-labelledby="mission-completed">
              <Mascot
                mood="celebrate"
                size={220}
                alt={t('daily-mission.completed.mascot')}
                className={styles.robot}
              />
              <h2 id="mission-completed">{t('daily-mission.completed')}!</h2>
              <p className={styles.reward}>
                {state.reward !== undefined && (
                  <>
                    {t('daily-mission.reward.amount', { count: state.reward })}{' '}
                    <span className="i-ph:coins" aria-hidden="true" />
                    <span className={styles.unit}>{t('coins.unit', { count: state.reward })}</span>
                  </>
                )}
              </p>
              <p>{t('daily-mission.tomorrow')}</p>
              <Button size="lg" onClick={functions.handleHome}>
                {t('navigation.home')}
              </Button>
            </section>
          )}
          {state.task && !queries.task.isError && !state.isCompleted && (
            <form
              className={styles.task}
              onSubmit={functions.handleSubmit}
              aria-busy={mutations.answer.isPending}
            >
              <h2 id="mission-question" className={styles.question}>
                {state.task.question}
              </h2>
              {state.task.image_url && (
                <img
                  src={state.task.image_url}
                  alt={t('daily-mission.task.image-alt')}
                  className={styles.picture}
                />
              )}
              {!state.isSupported && (
                <InlineError>{t('daily-mission.task.unsupported')}</InlineError>
              )}
              {state.isSupported && state.task.type === 'text' && (
                <label className={styles.text}>
                  {t('daily-mission.answer.label')}
                  <Input
                    size="lg"
                    value={state.answer}
                    onChange={functions.handleTextChange}
                    maxLength={200}
                    disabled={mutations.answer.isPending}
                    autoComplete="off"
                  />
                </label>
              )}
              {state.isSupported && state.task.type !== 'text' && (
                <fieldset
                  className={styles.options}
                  aria-labelledby="mission-question"
                  disabled={mutations.answer.isPending}
                >
                  {state.options.map((option, i) => (
                    <label
                      key={option}
                      className={cn(styles.option, state.answer === option && styles.selected)}
                    >
                      {state.answer === option && <AnswerPortal index={i} />}
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        checked={state.answer === option}
                        onChange={() => functions.handleSelectAnswer(option)}
                      />
                      <span>{option}</span>
                      <span
                        className={cn(styles.signal, 'i-ph:star-four-fill')}
                        aria-hidden="true"
                      />
                    </label>
                  ))}
                </fieldset>
              )}
              <div className={styles.feedback} aria-live="polite">
                {mutations.answer.data && !mutations.answer.data.correct && (
                  <p>{t('daily-mission.answer.incorrect')}</p>
                )}
                {mutations.answer.isError && <p role="alert">{t('daily-mission.answer.error')}</p>}
              </div>
              {mutations.answer.isError && (
                <Button
                  type="button"
                  variant="link"
                  disabled={queries.task.isFetching}
                  onClick={functions.handleRetry}
                >
                  {t('daily-mission.answer.retry')}
                </Button>
              )}
              <Button type="submit" size="lg" className={styles.check} disabled={!state.canSubmit}>
                {!mutations.answer.isPending && t('daily-mission.answer.submit')}
                {mutations.answer.isPending && t('daily-mission.answer.submitting')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </PageLayout.Root>
  )
}
