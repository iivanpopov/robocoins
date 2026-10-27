import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

import { Button, IconButton, Loader } from '#/components/ui'

import {
  GroupEmptyState,
  GroupForm,
  GroupPageLayout,
  GroupRequestError,
  GroupResultPanel,
  TeacherCompositionLabel,
  TeacherPicker,
} from '../../-components'
import { parseGroupIdParams } from '../../-utils'
import { useGroupTeachersPage } from './-hooks'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/groups/$groupId/teachers/',
)({
  head: () => ({ meta: [{ title: 'Викладачі групи | Robocoins' }] }),
  params: { parse: (params) => parseGroupIdParams(params) },
  component: GroupTeachersRoute,
})

function GroupTeachersRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/teachers/',
  })

  return <GroupTeachersPage key={params.groupId} />
}

function GroupTeachersPage() {
  const { state, functions, features } = useGroupTeachersPage()

  const t = useTranslate()

  const savedTeacherIds = state.savedTeacherIds

  return (
    <GroupPageLayout
      title={t('admin.groups.teachers.title')}
      description={
        <>
          {!state.group && t('admin.groups.teachers.description-empty')}
          {state.group &&
            t('admin.groups.teachers.description', {
              group: state.group.name,
            })}
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
          icon="i-ph:chalkboard-teacher-duotone"
          title={t('admin.groups.not-found.title')}
          description={t('admin.groups.not-found.description')}
        >
          <Button nativeButton={false} render={<Link to="/admin" />}>
            {t('admin.groups.back')}
          </Button>
        </GroupEmptyState>
      )}

      {state.group && !savedTeacherIds && (
        <GroupForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.groups.teachers.submit')}
          submitDisabled={!state.isReady}
          isSubmitting={state.isSubmitting}
          note={t('admin.groups.teachers.note')}
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
          <features.form.Field name="teacherIds">
            {(field) => (
              <TeacherPicker
                label={t('admin.groups.teachers.picker.label')}
                options={state.pickerOptions}
                selectedIds={field.state.value}
                onChange={(teacherIds) => field.handleChange(teacherIds)}
                disabled={state.isSubmitting}
                isPending={state.isPending}
                isError={state.isError}
                isRetrying={state.isTeachersFetching}
                onRetry={functions.handleRetryTeachers}
                isInvalid={field.state.meta.errors.length > 0}
              />
            )}
          </features.form.Field>

          {state.mutationErrorKey && <GroupRequestError messageKey={state.mutationErrorKey} />}
        </GroupForm>
      )}

      {state.group && savedTeacherIds && (
        <GroupResultPanel
          tone="success"
          title={t('admin.groups.teachers.success-title')}
          description={t('admin.groups.teachers.success-description', {
            group: state.group.name,
          })}
          details={[
            {
              label: t('admin.groups.teachers.result-group'),
              value: state.group.name,
            },
            {
              label: t('admin.groups.teachers.result-new'),
              value: (
                <TeacherCompositionLabel
                  teacherIds={savedTeacherIds}
                  teacherNames={state.savedTeacherNames}
                />
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
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link to="/admin/groups/teachers" />}
          >
            {t('admin.groups.bulk.entry')}
          </Button>
        </GroupResultPanel>
      )}
    </GroupPageLayout>
  )
}
