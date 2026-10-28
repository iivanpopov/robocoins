import { useTranslate } from '@kanjou/react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { cn } from 'cn'
import * as v from 'valibot'

import { getStudentLongestStreakStudentStudentIdLongestStreakGetQueryOptions } from '#/api/hooks/useGetStudentLongestStreakStudentStudentIdLongestStreakGet'
import { getStudentStreakStudentStudentIdStreakGetQueryOptions } from '#/api/hooks/useGetStudentStreakStudentStudentIdStreakGet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  Loader,
} from '#/components/ui'
import { PageLayout } from '#/routes/-components/page-layout'

import { ApiErrorNotice } from '../../-components'
import { useStudentStreakPage } from './-hooks'
import { StudentIdParamsSchema } from './-schemas'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/students/$studentId/streak/',
)({
  head: () => ({ meta: [{ title: 'Стрик учня | Robocoins' }] }),
  params: {
    parse: (params) => {
      const result = v.safeParse(StudentIdParamsSchema, params)
      if (!result.success) throw notFound()
      return result.output
    },
  },
  loader: async ({ context, params }) => {
    await Promise.all([
      context.queryClient.prefetchQuery({
        ...getStudentStreakStudentStudentIdStreakGetQueryOptions({
          path: { student_id: params.studentId },
        }),
        retry: false,
      }),
      context.queryClient.prefetchQuery({
        ...getStudentLongestStreakStudentStudentIdLongestStreakGetQueryOptions({
          path: { student_id: params.studentId },
        }),
        retry: false,
      }),
    ])
  },
  component: StudentStreakRoute,
})

function StudentStreakRoute() {
  const params = Route.useParams()

  return <StudentStreakPage key={params.studentId} />
}

function StudentStreakPage() {
  const { state, mutations, functions, features } = useStudentStreakPage()

  const t = useTranslate()

  return (
    <PageLayout.Root className={styles.page}>
      <PageLayout.Header>
        <IconButton
          nativeButton={false}
          render={
            <Link to="/admin/people/students/$studentId" params={{ studentId: state.studentId }} />
          }
          title={t('admin.streak.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('admin.streak.title')}</PageLayout.Title>
          <PageLayout.Description className={styles.description}>
            {t('admin.streak.description')}
          </PageLayout.Description>
        </PageLayout.Heading>
      </PageLayout.Header>

      {state.isPending && <Loader grow />}

      {state.isError && (
        <ApiErrorNotice
          kind={state.errorKind}
          fallback={t(state.errorKey ?? 'admin.streak.error.load')}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
          onLogin={functions.handleLogin}
        />
      )}

      {!state.isPending && !state.isError && (
        <>
          <article className={styles.summary}>
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles['metric-heading']}>
                  <span aria-hidden="true" className={cn('i-ph:fire', styles['metric-icon'])} />
                  <span className={styles['metric-label']}>{t('admin.streak.current.title')}</span>
                </span>
                <span className={styles['metric-value']}>
                  {state.isCurrentMissing && t('admin.streak.current.none-value')}
                  {!state.isCurrentMissing &&
                    !!state.currentStreak &&
                    t('admin.streak.days', { count: state.currentStreak.days })}
                </span>
                <span className={styles['metric-meta']}>
                  {state.isActive && t('admin.streak.current.active')}
                  {!!state.currentStreak && !state.isActive && t('admin.streak.current.ended')}
                  {state.isCurrentMissing && t('admin.streak.current.none')}
                </span>
              </div>

              <div className={styles.metric}>
                <span className={styles['metric-heading']}>
                  <span aria-hidden="true" className={cn('i-ph:trophy', styles['metric-icon'])} />
                  <span className={styles['metric-label']}>{t('admin.streak.longest.title')}</span>
                </span>
                <span className={styles['metric-value']}>
                  {t('admin.streak.days', { count: state.longestDays })}
                </span>
                <span className={styles['metric-meta']}>{t('admin.streak.longest.hint')}</span>
              </div>
            </div>

            {!!state.currentStreak && (
              <dl className={styles.dates}>
                <div className={styles.date}>
                  <dt>{t('admin.streak.started-label')}</dt>
                  <dd>
                    {t('admin.streak.date', {
                      date: new Date(state.currentStreak.start_date),
                    })}
                  </dd>
                </div>
                {!!state.currentStreak.end_date && (
                  <div className={styles.date}>
                    <dt>{t('admin.streak.finished-label')}</dt>
                    <dd>
                      {t('admin.streak.date', {
                        date: new Date(state.currentStreak.end_date),
                      })}
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </article>

          <section className={styles.manage}>
            <div className={styles['manage-heading']}>
              <h2 className={styles['manage-title']}>{t('admin.streak.actions.title')}</h2>
              <p className={styles['manage-description']}>
                {t('admin.streak.actions.description')}
              </p>
            </div>

            <div className={styles.actions}>
              <Button
                type="button"
                onClick={functions.handleStart}
                disabled={state.isActive || state.isBusy}
                aria-busy={mutations.start.isPending}
              >
                {mutations.start.isPending && <Loader />}
                {!mutations.start.isPending && <span aria-hidden="true" className="i-ph:play" />}
                {t('admin.streak.actions.start')}
              </Button>

              <button
                type="button"
                className={styles['end-button']}
                onClick={functions.handleOpenEnd}
                disabled={!state.isActive || state.isBusy}
                aria-busy={mutations.end.isPending}
              >
                {mutations.end.isPending && <Loader />}
                {!mutations.end.isPending && <span aria-hidden="true" className="i-ph:stop" />}
                {t('admin.streak.actions.end')}
              </button>
            </div>

            {state.isActive && (
              <p className={styles.note}>{t('admin.streak.actions.active-note')}</p>
            )}
            {!state.isActive && (
              <p className={styles.note}>{t('admin.streak.actions.inactive-note')}</p>
            )}

            {state.result === 'started' && (
              <p className={styles.result} role="status" aria-live="polite">
                {t('admin.streak.result.started')}
              </p>
            )}
            {state.result === 'ended' && (
              <p className={styles.result} role="status" aria-live="polite">
                {t('admin.streak.result.ended')}
              </p>
            )}
            {state.result === 'updated' && (
              <p className={styles.result} role="status" aria-live="polite">
                {t('admin.streak.result.updated')}
              </p>
            )}

            {!!state.actionErrorKey && (
              <ApiErrorNotice
                kind={state.actionErrorKind}
                fallback={t(state.actionErrorKey)}
                onLogin={functions.handleLogin}
              />
            )}

            <form className={styles.form} noValidate onSubmit={functions.handleUpdateSubmit}>
              <features.form.Field name="days">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="streak-days">{t('admin.streak.update.label')}</FieldLabel>
                    <Input
                      id="streak-days"
                      name={field.name}
                      inputMode="numeric"
                      autoComplete="off"
                      value={field.state.value}
                      disabled={!state.isActive || state.isBusy}
                      aria-invalid={!!field.state.meta.errors.length}
                      aria-describedby="streak-days-description streak-days-error"
                      onChange={(event) => field.handleChange(event.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <FieldDescription id="streak-days-description">
                      {state.isActive && t('admin.streak.validation.days')}
                      {!state.isActive && t('admin.streak.update.unavailable')}
                    </FieldDescription>
                    {!!field.state.meta.errors.length && (
                      <FieldError id="streak-days-error">
                        {t('admin.streak.validation.days')}
                      </FieldError>
                    )}
                  </Field>
                )}
              </features.form.Field>

              <Button
                type="submit"
                disabled={!state.isActive || state.isBusy || state.isFormSubmitting}
                aria-busy={mutations.update.isPending}
              >
                {mutations.update.isPending && <Loader />}
                {t('admin.streak.update.submit')}
              </Button>
            </form>
          </section>
        </>
      )}

      <AlertDialog open={state.isEndOpen} onOpenChange={functions.handleEndOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.streak.end.confirm.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.streak.end.confirm.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={functions.handleConfirmEnd}
              disabled={!state.isActive || state.isBusy}
            >
              {t('action.finish.title')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout.Root>
  )
}
