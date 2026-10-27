import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  IconButton,
  Loader,
} from '#/components/ui'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { GroupEmptyState, GroupForm, GroupRequestError, GroupResultPanel } from '../../-components'
import { useGroupCoursePage } from '../../-hooks'
import { parseGroupIdParams } from '../../-utils'
import { AdminSelect } from '../../../-components'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/groups/$groupId/course/',
)({
  head: () => ({ meta: [{ title: 'Курс групи | Robocoins' }] }),
  params: { parse: (params) => parseGroupIdParams(params) },
  component: GroupCourseRoute,
})

function GroupCourseRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/course/',
  })

  return <GroupCoursePage key={params.groupId} />
}

function GroupCoursePage() {
  const { state, functions, features } = useGroupCoursePage()

  const t = useTranslate()

  return (
    <AdminPageLayout.Root>
      <AdminPageLayout.Header align="end">
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/groups/$groupId" params={{ groupId: state.groupId }} />}
          title={t('admin.groups.back-to-group')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('admin.groups.change-course.title')}</AdminPageLayout.Title>
          <AdminPageLayout.Description>
            {!state.group && t('admin.groups.change-course.description-empty')}
            {state.group &&
              t('admin.groups.change-course.description', { group: state.group.name })}
          </AdminPageLayout.Description>
        </AdminPageLayout.Heading>
      </AdminPageLayout.Header>
      {state.isPending && <Loader grow />}
      {state.isError && state.errorKey && (
        <GroupRequestError
          messageKey={state.errorKey}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
        />
      )}
      {state.isNotFound && (
        <GroupEmptyState
          icon="i-ph:users-three-duotone"
          title={t('admin.groups.not-found.title')}
          description={t('admin.groups.not-found.description')}
        >
          <Button nativeButton={false} render={<Link to="/admin" />}>
            {t('navigation.groups')}
          </Button>
        </GroupEmptyState>
      )}

      {state.group && !state.errorKey && !state.courses.length && (
        <GroupEmptyState
          icon="i-ph:books-duotone"
          title={t('admin.groups.change-course.courses-empty-title')}
          description={t('admin.groups.change-course.courses-empty-description')}
        >
          <Button nativeButton={false} render={<Link to="/admin/courses/create" />}>
            {t('admin.courses.create.action')}
          </Button>
        </GroupEmptyState>
      )}

      {state.group && !state.errorKey && !!state.courses.length && !state.selectedCourseId && (
        <GroupForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.groups.change-course.action')}
          submitDisabled={state.isUnchanged}
          note={t('admin.groups.change-course.note')}
        >
          <features.form.Field name="courseId">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="group-change-course">{t('courses.label')}</FieldLabel>
                <AdminSelect
                  id="group-change-course"
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  items={state.courseItems}
                  placeholder={t('admin.groups.create.course-placeholder')}
                  ariaLabel={t('courses.label')}
                />
                {!!field.state.meta.errors.length && (
                  <FieldError>{t('admin.groups.create.course-error')}</FieldError>
                )}
                {state.isUnchanged && (
                  <FieldDescription>{t('admin.groups.change-course.same')}</FieldDescription>
                )}
              </Field>
            )}
          </features.form.Field>
        </GroupForm>
      )}

      {state.group && !!state.selectedCourseId && (
        <GroupResultPanel
          tone="local"
          title={t('admin.shared.local-result')}
          description={t('admin.groups.change-course.result-description')}
          details={[
            {
              label: t('admin.groups.change-course.current'),
              value: (
                <>
                  {state.course && state.course.name}
                  {!state.course &&
                    state.group &&
                    t('admin.groups.detail.course-fallback', { id: state.group.course_id })}
                </>
              ),
            },
            {
              label: t('admin.groups.change-course.proposed'),
              value: (
                <>
                  {state.selectedCourse && state.selectedCourse.name}
                  {!state.selectedCourse &&
                    !!state.selectedCourseFallbackId &&
                    t('admin.groups.detail.course-fallback', {
                      id: state.selectedCourseFallbackId,
                    })}
                </>
              ),
            },
          ]}
        >
          <Button
            nativeButton={false}
            render={<Link to="/admin/groups/$groupId" params={{ groupId: state.groupId }} />}
          >
            {t('admin.groups.back-to-group')}
          </Button>
          <Button variant="ghost" nativeButton={false} render={<Link to="/admin" />}>
            {t('navigation.groups')}
          </Button>
        </GroupResultPanel>
      )}
    </AdminPageLayout.Root>
  )
}
