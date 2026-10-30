import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, Field, FieldError, FieldLabel, IconButton, Input, Loader } from '#/components/ui'
import { PageLayout } from '#/routes/-components/page-layout'

import {
  GroupEmptyState,
  GroupForm,
  GroupRequestError,
  GroupResultPanel,
  TeacherPicker,
} from '../-components'
import { useCreateGroupPage } from '../-hooks'
import { AdminSelect } from '../../-components'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/groups/create/')({
  head: () => ({ meta: [{ title: 'Нова група | Robocoins' }] }),
  component: CreateGroupPage,
})

function CreateGroupPage() {
  const { state, functions, features } = useCreateGroupPage()

  const t = useTranslate()

  return (
    <PageLayout.Root>
      <PageLayout.Header align="end">
        <IconButton
          nativeButton={false}
          render={<Link to="/admin" />}
          title={t('navigation.groups')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('admin.groups.create.title')}</PageLayout.Title>
        </PageLayout.Heading>
      </PageLayout.Header>
      {state.createdGroup && (
        <GroupResultPanel
          tone="success"
          title={t('admin.groups.create.success-title')}
          description={t('admin.groups.create.success-description', {
            group: state.createdGroup.name,
            course:
              state.createdCourse?.name ??
              t('admin.groups.detail.course-fallback', {
                id: state.createdGroup.course_id,
              }),
          })}
          details={[
            {
              label: t('groups.name'),
              value: state.createdGroup.name,
            },
            {
              label: t('courses.label'),
              value:
                state.createdCourse?.name ??
                t('admin.groups.detail.course-fallback', {
                  id: state.createdGroup.course_id,
                }),
            },
          ]}
        >
          <Button
            nativeButton={false}
            render={
              <Link to="/admin/groups/$groupId" params={{ groupId: state.createdGroup.id }} />
            }
          >
            {t('admin.groups.create.open')}
          </Button>
          <Button type="button" variant="ghost" onClick={functions.handleCreateAnother}>
            {t('action.create-another')}
          </Button>
          <Button variant="link" nativeButton={false} render={<Link to="/admin" />}>
            {t('navigation.groups')}
          </Button>
        </GroupResultPanel>
      )}

      {!state.createdGroup && state.isCoursesPending && <Loader grow />}
      {!state.createdGroup && state.isCoursesError && state.coursesErrorKey && (
        <GroupRequestError
          messageKey={state.coursesErrorKey}
          onRetry={functions.handleRetryCourses}
          isRetrying={state.isCoursesFetching}
        />
      )}
      {!state.createdGroup &&
        !state.isCoursesPending &&
        !state.isCoursesError &&
        !state.hasCourses && (
          <GroupEmptyState
            icon="i-ph:books"
            title={t('admin.groups.create.courses-empty-title')}
            description={t('admin.groups.create.courses-empty-description')}
          >
            <Button nativeButton={false} render={<Link to="/admin/courses/create" />}>
              {t('admin.courses.create.action')}
            </Button>
          </GroupEmptyState>
        )}
      {!state.createdGroup &&
        !state.isCoursesPending &&
        !state.isCoursesError &&
        state.hasCourses && (
          <GroupForm
            onSubmit={functions.handleSubmit}
            submitLabel={t('admin.groups.create.submit')}
            isSubmitting={state.isSubmitting}
          >
            <features.form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="group-create-name">{t('groups.name')}</FieldLabel>
                  <Input
                    id="group-create-name"
                    name={field.name}
                    value={field.state.value}
                    placeholder={t('admin.groups.create.name-placeholder')}
                    autoComplete="off"
                    disabled={state.isSubmitting}
                    aria-invalid={!!field.state.meta.errors.length}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {!!field.state.meta.errors.length && (
                    <FieldError>{t('admin.groups.create.name-error')}</FieldError>
                  )}
                </Field>
              )}
            </features.form.Field>

            <features.form.Field name="courseId">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="group-create-course">{t('courses.label')}</FieldLabel>
                  <AdminSelect
                    id="group-create-course"
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                    items={state.courseItems}
                    placeholder={t('admin.groups.create.course-placeholder')}
                    ariaLabel={t('courses.label')}
                    disabled={state.isSubmitting}
                  />
                  {!!field.state.meta.errors.length && (
                    <FieldError>{t('admin.groups.create.course-error')}</FieldError>
                  )}
                </Field>
              )}
            </features.form.Field>

            <features.form.Field name="teacherIds">
              {(field) => (
                <TeacherPicker
                  label={t('teachers.title')}
                  options={state.teacherOptions}
                  selectedIds={field.state.value}
                  onChange={(teacherIds) => field.handleChange(teacherIds)}
                  disabled={state.isSubmitting}
                  isPending={state.isTeachersPending}
                  isError={state.isTeachersError}
                  isRetrying={state.isTeachersFetching}
                  onRetry={functions.handleRetryTeachers}
                  isInvalid={field.state.meta.errors.length > 0}
                />
              )}
            </features.form.Field>

            {state.errorKey && <GroupRequestError messageKey={state.errorKey} />}
          </GroupForm>
        )}
    </PageLayout.Root>
  )
}
