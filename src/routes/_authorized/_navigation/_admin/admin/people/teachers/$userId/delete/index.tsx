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

import {
  TeacherForm,
  TeacherGroupRow,
  TeacherPageLayout,
  TeacherRequestError,
  TeacherResultPanel,
  TeacherUnavailable,
} from '../../-components'
import { useTeacherDeletePage } from '../../-hooks'
import { parseTeacherIdParams } from '../../-utils'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/teachers/$userId/delete/',
)({
  head: () => ({ meta: [{ title: 'Видалення викладача | Robocoins' }] }),
  params: { parse: (params) => parseTeacherIdParams(params) },
  component: TeacherDeleteRoute,
})

function TeacherDeleteRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/teachers/$userId/delete/',
  })

  return <TeacherDeletePage key={params.userId} />
}

function TeacherDeletePage() {
  const { state, functions, features } = useTeacherDeletePage()

  const t = useTranslate()

  return (
    <TeacherPageLayout
      title={t('admin.teachers.delete.title')}
      description={
        <>
          {!state.isAvailable && t('admin.teachers.delete.description-empty')}
          {state.isAvailable && t('admin.teachers.delete.description', { name: state.name })}
        </>
      }
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/people/teachers/$userId" params={{ userId: state.teacherId }} />}
          title={t('admin.teachers.back-to-profile')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
      {state.isPending && <Loader grow />}
      {!state.isPending && state.isError && !state.notFound && (
        <TeacherRequestError
          status={state.errorStatus}
          message={t('admin.teachers.profile.error')}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
        />
      )}
      <TeacherUnavailable
        notFound={state.notFound}
        notTeacher={state.notTeacher}
        isMismatch={state.isMismatch}
      />

      {state.isAvailable && !state.isDeletedLocally && (
        <>
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('admin.teachers.delete.groups-title')}</h2>
            {!!state.groups.length && (
              <div className={styles.groups}>
                {state.groups.map((group) => (
                  <TeacherGroupRow key={group.id} group={group} />
                ))}
              </div>
            )}
            {!state.groups.length && (
              <p className={styles['groups-empty']}>{t('admin.teachers.delete.groups-empty')}</p>
            )}
            <p className={styles.note}>{t('admin.teachers.delete.reassign-note')}</p>
          </section>

          <TeacherForm
            onSubmit={functions.handleSubmit}
            submitLabel={t('admin.teachers.delete.submit')}
            submitClassName={styles.danger}
            note={t('admin.teachers.delete.note')}
          >
            <features.form.Field name="confirmation">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="teacher-delete-confirmation">
                    {t('admin.teachers.delete.confirm-label')}
                  </FieldLabel>
                  <Input
                    id="teacher-delete-confirmation"
                    name={field.name}
                    value={state.confirmation}
                    maxLength={200}
                    autoComplete="off"
                    placeholder={t('admin.teachers.delete.confirm-placeholder')}
                    aria-invalid={!!field.state.meta.errors.length}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {!!field.state.meta.errors.length && (
                    <FieldError>{t('admin.teachers.delete.confirm-error')}</FieldError>
                  )}
                </Field>
              )}
            </features.form.Field>
          </TeacherForm>
        </>
      )}

      {state.isAvailable && (
        <AlertDialog open={state.isDialogOpen} onOpenChange={functions.handleDialogOpenChange}>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>{t('admin.teachers.delete.dialog-title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('admin.teachers.delete.dialog-description', { name: state.name })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={functions.handleConfirmDelete}>
                {t('admin.teachers.delete.dialog-action')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {state.isAvailable && state.isDeletedLocally && (
        <TeacherResultPanel
          title={t('admin.teachers.delete.result-title')}
          description={t('admin.teachers.delete.result-description')}
          details={[
            {
              label: t('admin.teachers.teacher'),
              value: state.name,
            },
            {
              label: t('admin.teachers.delete.result-groups'),
              value: t('admin.teachers.profile.groups-count', { count: state.groups.length }),
            },
          ]}
        >
          <div className={styles.actions}>
            <Button
              nativeButton={false}
              render={
                <Link to="/admin/people/teachers/$userId" params={{ userId: state.teacherId }} />
              }
            >
              {t('admin.teachers.back-to-profile')}
            </Button>
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link to="/admin/people/teachers" />}
            >
              {t('admin.teachers.result.list')}
            </Button>
          </div>
        </TeacherResultPanel>
      )}
    </TeacherPageLayout>
  )
}
