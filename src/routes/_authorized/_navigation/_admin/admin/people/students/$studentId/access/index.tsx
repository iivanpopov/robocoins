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
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { StudentRequestError } from '../-components'
// import { StudentResultPanel } from '../-components'
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
    <AdminPageLayout.Root bottomSpace>
      <AdminPageLayout.Header>
        <IconButton
          nativeButton={false}
          render={
            <Link to="/admin/people/students/$studentId" params={{ studentId: state.studentId }} />
          }
          title={t('navigation.profile')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('students.access.title')}</AdminPageLayout.Title>
          <AdminPageLayout.Description>
            {!state.student && t('students.access.description-empty')}
            {!!state.student && t('students.access.description', { name: state.name })}
          </AdminPageLayout.Description>
        </AdminPageLayout.Heading>
      </AdminPageLayout.Header>
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
            <h2 className={styles['section-title']}>{t('access.code.label')}</h2>

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
                <output className={styles.code} aria-label={t('access.code.label')}>
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
                    {t('access.code.reset')}
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
                  {features.clipboard.state.isCopied && t('access.code.copied')}
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

          {/* No API integration: session revocation only updates local state.
          {!state.isRevokedLocally && (
            <section className={styles.card}>
              <h2 className={styles['section-title']}>{t('students.access.sessions.title')}</h2>
              <p className={styles.note}>{t('students.access.sessions.note')}</p>
              <div className={styles.actions}>
                <Button variant="ghost" onClick={functions.handleOpenRevokeDialog}>
                  {t('access.sessions.end')}
                </Button>
              </div>
            </section>
          )}

          {state.isRevokedLocally && (
            <StudentResultPanel
              title={t('access.sessions.result-title')}
              description={t('students.access.sessions.result-description')}
              details={[
                {
                  label: t('role.student'),
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
                {t('navigation.profile')}
              </Button>
            </StudentResultPanel>
          )}

          */}

          <AlertDialog
            open={state.isResetDialogOpen}
            onOpenChange={functions.handleResetDialogOpenChange}
          >
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>{t('access.code.reset-confirm-title')}</AlertDialogTitle>
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
                  {t('access.code.reset')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* No API integration: this confirmation does not revoke server sessions.
          <AlertDialog
            open={state.isRevokeDialogOpen}
            onOpenChange={functions.handleRevokeDialogOpenChange}
          >
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>{t('access.sessions.confirm-title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('students.access.sessions.confirm-description', { name: state.name })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={functions.handleConfirmRevoke}>
                  {t('action.continue-locally')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          */}
        </>
      )}
    </AdminPageLayout.Root>
  )
}
