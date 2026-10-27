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
  GroupEmptyState,
  GroupForm,
  GroupPageLayout,
  GroupRequestError,
  GroupResultPanel,
} from '../../-components'
import { useGroupRenamePage } from '../../-hooks'
import { parseGroupIdParams } from '../../-utils'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/groups/$groupId/rename/',
)({
  head: () => ({ meta: [{ title: 'Перейменування групи | Robocoins' }] }),
  params: { parse: (params) => parseGroupIdParams(params) },
  component: GroupRenameRoute,
})

function GroupRenameRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/rename/',
  })

  return <GroupRenamePage key={params.groupId} />
}

function GroupRenamePage() {
  const { state, functions, features } = useGroupRenamePage()

  const t = useTranslate()

  return (
    <GroupPageLayout
      title={t('admin.groups.rename.title')}
      description={
        <>
          {!state.group && t('admin.groups.rename.description-empty')}
          {state.group && t('admin.groups.rename.description', { group: state.group.name })}
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

      {state.group && !state.renamedName && (
        <GroupForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.groups.rename.submit')}
          submitDisabled={state.isUnchanged}
          note={t('admin.groups.rename.note')}
        >
          <features.form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="group-rename-name">
                  {t('admin.groups.create.name-label')}
                </FieldLabel>
                <Input
                  id="group-rename-name"
                  name={field.name}
                  value={field.state.value}
                  placeholder={t('admin.groups.create.name-placeholder')}
                  autoComplete="off"
                  aria-invalid={!!field.state.meta.errors.length}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
                {!!field.state.meta.errors.length && (
                  <FieldError>{t('admin.groups.create.name-error')}</FieldError>
                )}
                {state.isUnchanged && (
                  <FieldDescription>{t('admin.groups.rename.same')}</FieldDescription>
                )}
              </Field>
            )}
          </features.form.Field>
        </GroupForm>
      )}

      {state.group && !!state.renamedName && (
        <GroupResultPanel
          tone="local"
          title={t('admin.groups.rename.result-title')}
          description={t('admin.groups.rename.result-description')}
          details={[
            {
              label: t('admin.groups.rename.current'),
              value: state.group.name,
            },
            {
              label: t('admin.groups.rename.proposed'),
              value: state.renamedName,
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
