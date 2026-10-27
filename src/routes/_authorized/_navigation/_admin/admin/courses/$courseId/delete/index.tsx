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

import { CourseEmptyState, CourseForm, CourseRequestError, ResultPanel } from '../../-components'
import { useCourseDeletePage } from '../../-hooks'
import { parseCourseIdParams } from '../../-utils'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/courses/$courseId/delete/',
)({
  head: () => ({ meta: [{ title: 'Видалення курсу | Robocoins' }] }),
  params: { parse: (params) => parseCourseIdParams(params) },
  component: CourseDeleteRoute,
})

function CourseDeleteRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/delete/',
  })

  return <CourseDeletePage key={params.courseId} />
}

function CourseDeletePage() {
  const { state, functions, features } = useCourseDeletePage()

  const t = useTranslate()

  return (
    <AdminPageLayout.Root>
      <AdminPageLayout.Header align="end">
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />}
          title={t('admin.courses.back-to-course')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('admin.courses.delete.title')}</AdminPageLayout.Title>
          <AdminPageLayout.Description>
            {!state.course && t('admin.courses.delete.description-empty')}
            {state.course && t('admin.courses.delete.description', { course: state.course.name })}
          </AdminPageLayout.Description>
        </AdminPageLayout.Heading>
      </AdminPageLayout.Header>
      {state.isPending && <Loader grow />}
      {state.isError && state.errorKey && (
        <CourseRequestError
          messageKey={state.errorKey}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
        />
      )}
      {state.isNotFound && (
        <CourseEmptyState
          icon="i-ph:books-duotone"
          title={t('admin.courses.not-found.title')}
          description={t('admin.courses.not-found.description')}
        >
          <Button nativeButton={false} render={<Link to="/admin/courses" />}>
            {t('admin.courses.back')}
          </Button>
        </CourseEmptyState>
      )}

      {state.course && !state.isDeletedLocally && (
        <CourseForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.courses.delete.action')}
          submitClassName={styles.danger}
        >
          <features.form.Field name="confirmation">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="course-delete-confirmation">
                  {t('admin.courses.delete.confirm-label')}
                </FieldLabel>
                <Input
                  id="course-delete-confirmation"
                  name={field.name}
                  value={field.state.value}
                  placeholder={t('courses.name')}
                  autoComplete="off"
                  aria-invalid={!!field.state.meta.errors.length}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
                {!!field.state.meta.errors.length && (
                  <FieldError>{t('admin.courses.delete.confirm-error')}</FieldError>
                )}
              </Field>
            )}
          </features.form.Field>
        </CourseForm>
      )}

      {state.course && (
        <AlertDialog open={state.isDialogOpen} onOpenChange={functions.handleDialogOpenChange}>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>{t('action.delete.confirm-title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('admin.courses.delete.dialog-description', { course: state.course.name })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={functions.handleConfirmDelete}>
                {t('action.confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {state.course && state.isDeletedLocally && (
        <ResultPanel
          tone="local"
          title={t('admin.shared.local-result')}
          description={t('admin.courses.delete.result-description')}
          details={[
            {
              label: t('courses.label'),
              value: state.course.name,
            },
          ]}
        >
          <div className={styles.actions}>
            <Button
              nativeButton={false}
              render={<Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />}
            >
              {t('admin.courses.back-to-course')}
            </Button>
            <Button variant="ghost" nativeButton={false} render={<Link to="/admin/courses" />}>
              {t('admin.courses.back')}
            </Button>
          </div>
        </ResultPanel>
      )}
    </AdminPageLayout.Root>
  )
}
