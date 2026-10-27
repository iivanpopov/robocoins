import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { cn } from 'cn'

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
  IconButton,
  Loader,
} from '#/components/ui'

import { StudentPageLayout, StudentRequestError, StudentResultPanel } from '../-components'
import { parseStudentIdParams } from '../-utils'
import { StudentAvatar } from '../../-components'
import { useStudentAccessPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/students/$studentId/access/',
)({
  head: () => ({ meta: [{ title: 'Доступ учня | Robocoins' }] }),
  params: { parse: (params) => parseStudentIdParams(params) },
  component: StudentAccessRoute,
})

function StudentAccessRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/access/',
  })

  return <StudentAccessPage key={params.studentId} />
}

function StudentAccessPage() {
  const { state, mutations, functions, features } = useStudentAccessPage()

  const t = useTranslate()

  return (
    <StudentPageLayout
      title={t('students.access.title')}
      description={
        <>
          {!state.student && t('students.access.description-empty')}
          {!!state.student && t('students.access.description', { name: state.name })}
        </>
      }
      back={
        <IconButton
          nativeButton={false}
          render={
            <Link to="/admin/people/students/$studentId" params={{ studentId: state.studentId }} />
          }
          title={t('students.manage.back-to-profile')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
      {state.isPending && <Loader grow />}
      {!state.isPending && state.isError && !state.student && (
        <StudentRequestError
          status={state.errorStatus}
          message={t('students.profile.error')}
          onRetry={functions.handleRetryStudent}
          isRetrying={state.isFetching}
        />
      )}

      {!!state.student && (
        <>
          <article className={styles.identity}>
            <StudentAvatar
              name={state.student.name}
              avatar={state.student.avatar}
              size="lg"
              className={styles.avatar}
            />
            <div className={styles['identity-copy']}>
              <span className={styles.name}>{state.student.name}</span>
              <span className={styles.hint}>{t('students.access.code.note')}</span>
            </div>
          </article>

          <section className={styles.card}>
            <h2 className={styles['section-title']}>{t('students.access.code.title')}</h2>

            {state.isCredentialsPending && <Loader grow />}
            {!state.isCredentialsPending && state.isCredentialsError && (
              <StudentRequestError
                status={state.credentialsErrorStatus}
                message={t('students.access.code.error')}
                forbiddenMessage={t('students.access.code.forbidden')}
                onRetry={functions.handleRetryCredentials}
                isRetrying={state.isCredentialsFetching}
              />
            )}

            {!state.isCredentialsPending && !state.isCredentialsError && !!state.code && (
              <>
                <output className={styles.code} aria-label={t('students.access.code.title')}>
                  {state.code}
                </output>
                <div className={styles.actions}>
                  <Button
                    variant="contain"
                    onClick={features.clipboard.functions.handleCopy}
                    disabled={mutations.reset.isPending}
                  >
                    {features.clipboard.state.isCopied && (
                      <span aria-hidden="true" className="i-ph:check-bold" />
                    )}
                    {!features.clipboard.state.isCopied && (
                      <span aria-hidden="true" className="i-ph:copy-bold" />
                    )}
                    {t('students.register.success.copy')}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={functions.handleOpenResetDialog}
                    disabled={mutations.reset.isPending}
                    aria-busy={mutations.reset.isPending}
                  >
                    {mutations.reset.isPending && <Loader />}
                    {t('students.access.code.reset')}
                  </Button>
                </div>
                <p
                  role="status"
                  aria-live="polite"
                  className={cn(
                    styles['copy-status'],
                    features.clipboard.state.isCopyError && styles['copy-status-error'],
                  )}
                >
                  {features.clipboard.state.isCopied && t('students.register.success.copied')}
                  {features.clipboard.state.isCopyError &&
                    t('students.register.success.copy-error')}
                </p>
              </>
            )}

            {mutations.reset.isError && (
              <StudentRequestError
                status={state.resetErrorStatus}
                message={t('students.access.code.reset-error')}
                forbiddenMessage={t('students.access.code.reset-forbidden')}
                onRetry={functions.handleRetryReset}
                isRetrying={mutations.reset.isPending}
              />
            )}
          </section>

          {!state.isRevokedLocally && (
            <section className={styles.card}>
              <h2 className={styles['section-title']}>{t('students.access.sessions.title')}</h2>
              <p className={styles.note}>{t('students.access.sessions.note')}</p>
              <div className={styles.actions}>
                <Button variant="ghost" onClick={functions.handleOpenRevokeDialog}>
                  {t('students.access.sessions.action')}
                </Button>
              </div>
            </section>
          )}

          {state.isRevokedLocally && (
            <StudentResultPanel
              title={t('students.access.sessions.result-title')}
              description={t('students.access.sessions.result-description')}
              details={[
                {
                  label: t('students.delete.result-detail'),
                  value: state.name,
                },
              ]}
            >
              <Button variant="ghost" onClick={functions.handleResetRevokeResult}>
                {t('students.access.sessions.again')}
              </Button>
              <Button
                nativeButton={false}
                render={
                  <Link
                    to="/admin/people/students/$studentId"
                    params={{ studentId: state.studentId }}
                  />
                }
              >
                {t('students.manage.back-to-profile')}
              </Button>
            </StudentResultPanel>
          )}

          <AlertDialog
            open={state.isResetDialogOpen}
            onOpenChange={functions.handleResetDialogOpenChange}
          >
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>{t('students.access.code.reset-confirm-title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('students.access.code.reset-confirm-description', { name: state.name })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={functions.handleConfirmReset}
                  disabled={mutations.reset.isPending}
                >
                  {t('students.access.code.reset-confirm-action')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog
            open={state.isRevokeDialogOpen}
            onOpenChange={functions.handleRevokeDialogOpenChange}
          >
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>{t('students.access.sessions.confirm-title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('students.access.sessions.confirm-description', { name: state.name })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={functions.handleConfirmRevoke}>
                  {t('students.access.sessions.confirm-action')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </StudentPageLayout>
  )
}
