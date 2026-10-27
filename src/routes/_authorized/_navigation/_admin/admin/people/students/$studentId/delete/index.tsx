import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

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
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  Loader,
} from '#/components/ui'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { StudentRequestError, StudentResultPanel } from '../-components'
import { parseStudentIdParams } from '../-utils'
import { StudentAvatar } from '../../-components'
import { useStudentDeletePage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/students/$studentId/delete/',
)({
  head: () => ({ meta: [{ title: 'Видалення акаунта | Robocoins' }] }),
  params: { parse: (params) => parseStudentIdParams(params) },
  component: StudentDeleteRoute,
})

function StudentDeleteRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/delete/',
  })

  return <StudentDeletePage key={params.studentId} />
}

function StudentDeletePage() {
  const { state, functions, features } = useStudentDeletePage()

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
          <AdminPageLayout.Title>{t('students.delete.title')}</AdminPageLayout.Title>
          <AdminPageLayout.Description>
            {!state.student && t('students.delete.description-empty')}
            {!!state.student && t('students.delete.description', { name: state.student.name })}
          </AdminPageLayout.Description>
        </AdminPageLayout.Heading>
      </AdminPageLayout.Header>
      {state.isPending && <Loader grow />}
      {!state.isPending && state.isError && !state.student && (
        <StudentRequestError
          status={state.errorStatus}
          message={t('students.profile.error')}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
        />
      )}

      {!!state.student && !state.isDeletedLocally && (
        <>
          <article className={styles.note}>
            <span aria-hidden="true" className={styles['note-icon']}>
              <span className="i-ph:warning-circle-duotone" />
            </span>
            <div className={styles['note-copy']}>
              <div className={styles.identity}>
                <StudentAvatar
                  name={state.student.name}
                  avatar={state.student.avatar}
                  size="lg"
                  className={styles.avatar}
                />
                <span className={styles.name}>{state.student.name}</span>
              </div>
              <p className={styles['note-text']}>{t('students.delete.note')}</p>
            </div>
          </article>

          <section className={styles.card}>
            <form className={styles.form} onSubmit={functions.handleSubmit} noValidate>
              <features.form.Field name="confirmation">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor="student-delete-confirmation">
                      {t('students.delete.confirmation-label')}
                    </FieldLabel>
                    <Input
                      id="student-delete-confirmation"
                      name={field.name}
                      value={field.state.value}
                      maxLength={200}
                      autoComplete="off"
                      placeholder={t('field.student-nickname.placeholder')}
                      aria-invalid={!!field.state.meta.errors.length}
                      onChange={(event) => field.handleChange(event.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {!!field.state.meta.errors.length && (
                      <FieldError>{t('students.delete.confirmation-error')}</FieldError>
                    )}
                  </Field>
                )}
              </features.form.Field>

              <div className={styles.actions}>
                <Button type="submit" disabled={!state.canConfirm}>
                  {t('students.delete.submit')}
                </Button>
              </div>
            </form>
          </section>
        </>
      )}

      {!!state.student && state.isDeletedLocally && (
        <StudentResultPanel
          title={t('students.delete.result-title')}
          description={t('students.delete.result-description')}
          details={[
            {
              label: t('role.student'),
              value: state.student.name,
            },
            {
              label: t('field.action.label'),
              value: t('students.delete.result-action-value'),
            },
          ]}
        >
          <Button nativeButton={false} render={<Link to="/admin/people/students" />}>
            {t('students.register.success.list')}
          </Button>
          <Button
            variant="ghost"
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
          <Button variant="ghost" onClick={functions.handleResetResult}>
            {t('students.delete.again')}
          </Button>
        </StudentResultPanel>
      )}

      {!!state.student && (
        <AlertDialog open={state.isDialogOpen} onOpenChange={functions.handleDialogOpenChange}>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>{t('students.delete.dialog-title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('students.delete.dialog-description', { name: state.student.name })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={functions.handleConfirmDelete}>
                {t('action.continue-locally')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AdminPageLayout.Root>
  )
}
