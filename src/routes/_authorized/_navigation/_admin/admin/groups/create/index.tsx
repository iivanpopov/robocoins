import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, Field, FieldError, FieldLabel, IconButton, Input, Loader } from '#/components/ui'

import {
  GroupEmptyState,
  GroupForm,
  GroupPageLayout,
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
    <GroupPageLayout
      title={t('admin.groups.create.title')}
      description={t('admin.groups.create.description')}
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin" />}
          title={t('admin.groups.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
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
              label: t('admin.groups.create.name-label'),
              value: state.createdGroup.name,
            },
            {
              label: t('admin.groups.create.course-label'),
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
            {t('admin.groups.create.another')}
          </Button>
          <Button variant="link" nativeButton={false} render={<Link to="/admin" />}>
            {t('admin.groups.back')}
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
            icon="i-ph:books-duotone"
            title={t('admin.groups.create.courses-empty-title')}
            description={t('admin.groups.create.courses-empty-description')}
          >
            <Button nativeButton={false} render={<Link to="/admin/courses/create" />}>
              {t('admin.courses.create')}
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
            note={t('admin.groups.create.teacher-note')}
            cancel={
              <Button variant="ghost" nativeButton={false} render={<Link to="/admin" />}>
                {t('action.cancel')}
              </Button>
            }
          >
            <features.form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="group-create-name">
                    {t('admin.groups.create.name-label')}
                  </FieldLabel>
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
                  <FieldLabel htmlFor="group-create-course">
                    {t('admin.groups.create.course-label')}
                  </FieldLabel>
                  <AdminSelect
                    id="group-create-course"
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                    items={state.courseItems}
                    placeholder={t('admin.groups.create.course-placeholder')}
                    ariaLabel={t('admin.groups.create.course-label')}
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
                  label={t('admin.groups.teachers.picker.label')}
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
    </GroupPageLayout>
  )
}
