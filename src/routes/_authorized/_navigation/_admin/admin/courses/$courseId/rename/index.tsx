import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  Loader,
} from '#/components/ui'

import {
  CourseEmptyState,
  CourseForm,
  CoursePageLayout,
  CourseRequestError,
  ResultPanel,
} from '../../-components'
import { useCourseRenamePage } from '../../-hooks'
import { parseCourseIdParams } from '../../-utils'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/courses/$courseId/rename/',
)({
  head: () => ({ meta: [{ title: 'Перейменування курсу | Robocoins' }] }),
  params: { parse: (params) => parseCourseIdParams(params) },
  component: CourseRenameRoute,
})

function CourseRenameRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/rename/',
  })

  return <CourseRenamePage key={params.courseId} />
}

function CourseRenamePage() {
  const { state, functions, features } = useCourseRenamePage()

  const t = useTranslate()

  return (
    <CoursePageLayout
      title={t('admin.courses.rename.title')}
      description={
        <>
          {!state.course && t('admin.courses.rename.description-empty')}
          {state.course && t('admin.courses.rename.description', { course: state.course.name })}
        </>
      }
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />}
          title={t('admin.courses.back-to-course')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
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

      {state.course && !state.renamedName && (
        <CourseForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.courses.rename.submit')}
          submitDisabled={state.isUnchanged}
          note={t('admin.courses.rename.note')}
          cancel={
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />}
            >
              {t('action.cancel')}
            </Button>
          }
        >
          <features.form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="course-rename-name">
                  {t('admin.courses.form.name-label')}
                </FieldLabel>
                <Input
                  id="course-rename-name"
                  name={field.name}
                  value={field.state.value}
                  placeholder={t('admin.courses.form.name-placeholder')}
                  autoComplete="off"
                  aria-invalid={!!field.state.meta.errors.length}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
                {!!field.state.meta.errors.length && (
                  <FieldError>{t('admin.courses.form.name-error')}</FieldError>
                )}
                {state.isUnchanged && (
                  <FieldDescription>{t('admin.courses.rename.same')}</FieldDescription>
                )}
              </Field>
            )}
          </features.form.Field>
        </CourseForm>
      )}

      {state.course && !!state.renamedName && (
        <ResultPanel
          tone="local"
          title={t('admin.courses.rename.result-title')}
          description={t('admin.courses.rename.result-description')}
          details={[
            {
              label: t('admin.courses.rename.current'),
              value: state.course.name,
            },
            {
              label: t('admin.courses.rename.proposed'),
              value: state.renamedName,
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
    </CoursePageLayout>
  )
}
