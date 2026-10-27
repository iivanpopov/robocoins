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

import {
  GroupEmptyState,
  GroupForm,
  GroupPageLayout,
  GroupRequestError,
  GroupResultPanel,
} from '../../-components'
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

  let currentCourseName = ''
  if (state.course) currentCourseName = state.course.name
  if (!state.course && state.group) {
    currentCourseName = t('admin.groups.detail.course-fallback', { id: state.group.course_id })
  }
  const courseItems = state.courses.map((course) => ({
    value: String(course.id),
    label: course.name,
  }))

  return (
    <GroupPageLayout
      title={t('admin.groups.change-course.title')}
      description={
        <>
          {!state.group && t('admin.groups.change-course.description-empty')}
          {state.group && t('admin.groups.change-course.description', { group: state.group.name })}
        </>
      }
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/groups/$groupId" params={{ groupId: state.groupId }} />}
          title={t('admin.groups.back-to-group')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
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
            {t('admin.groups.back')}
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
            {t('admin.courses.create')}
          </Button>
        </GroupEmptyState>
      )}

      {state.group && !state.errorKey && !!state.courses.length && !state.selectedCourseId && (
        <GroupForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.groups.change-course.submit')}
          submitDisabled={state.isUnchanged}
          note={t('admin.groups.change-course.note')}
          cancel={
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link to="/admin/groups/$groupId" params={{ groupId: state.groupId }} />}
            >
              {t('action.cancel')}
            </Button>
          }
        >
          <features.form.Field name="courseId">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="group-change-course">
                  {t('admin.groups.create.course-label')}
                </FieldLabel>
                <AdminSelect
                  id="group-change-course"
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                  items={courseItems}
                  placeholder={t('admin.groups.create.course-placeholder')}
                  ariaLabel={t('admin.groups.create.course-label')}
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
          title={t('admin.groups.change-course.result-title')}
          description={t('admin.groups.change-course.result-description')}
          details={[
            {
              label: t('admin.groups.change-course.current'),
              value: currentCourseName,
            },
            {
              label: t('admin.groups.change-course.proposed'),
              value:
                state.selectedCourse?.name ??
                t('admin.groups.detail.course-fallback', {
                  id: Number(state.selectedCourseId),
                }),
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
            {t('admin.groups.back')}
          </Button>
        </GroupResultPanel>
      )}
    </GroupPageLayout>
  )
}
