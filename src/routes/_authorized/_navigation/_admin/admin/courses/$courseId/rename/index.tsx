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
import { PageLayout } from '#/routes/-components/page-layout'

import { CourseEmptyState, CourseForm, CourseRequestError, ResultPanel } from '../../-components'
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
    <PageLayout.Root>
      <PageLayout.Header align="end">
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />}
          title={t('admin.courses.back-to-course')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('admin.courses.rename.title')}</PageLayout.Title>
          <PageLayout.Description>
            {!state.course && t('admin.courses.rename.description-empty')}
            {state.course && t('admin.courses.rename.description', { course: state.course.name })}
          </PageLayout.Description>
        </PageLayout.Heading>
      </PageLayout.Header>
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
          icon="i-ph:books"
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
          submitLabel={t('action.rename')}
          submitDisabled={state.isUnchanged}
        >
          <Field>
            <FieldLabel htmlFor="course-rename-name">{t('courses.name')}</FieldLabel>
            <Input
              id="course-rename-name"
              name="name"
              value={features.nameField.value}
              placeholder={t('admin.courses.form.name-placeholder')}
              autoComplete="off"
              aria-invalid={!!features.nameField.error}
              onChange={(event) => features.nameField.handleChange(event.target.value)}
              onBlur={features.nameField.handleBlur}
            />
            {features.nameField.error && (
              <FieldError>{t('admin.courses.form.name-error')}</FieldError>
            )}
            {state.isUnchanged && (
              <FieldDescription>{t('validation.name-unchanged')}</FieldDescription>
            )}
          </Field>
        </CourseForm>
      )}

      {state.course && !!state.renamedName && (
        <ResultPanel
          tone="local"
          title={t('admin.shared.local-result')}
          description={t('admin.courses.rename.result-description')}
          details={[
            {
              label: t('field.current-name'),
              value: state.course.name,
            },
            {
              label: t('field.proposed-name'),
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
    </PageLayout.Root>
  )
}
