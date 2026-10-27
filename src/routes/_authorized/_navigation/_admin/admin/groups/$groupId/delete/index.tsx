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
  FieldDescription,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
  Loader,
} from '#/components/ui'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { GroupEmptyState, GroupForm, GroupRequestError, GroupResultPanel } from '../../-components'
import { useGroupDeletePage } from '../../-hooks'
import { parseGroupIdParams } from '../../-utils'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/groups/$groupId/delete/',
)({
  head: () => ({ meta: [{ title: 'Видалення групи | Robocoins' }] }),
  params: { parse: (params) => parseGroupIdParams(params) },
  component: GroupDeleteRoute,
})

function GroupDeleteRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/delete/',
  })

  return <GroupDeletePage key={params.groupId} />
}

function GroupDeletePage() {
  const { state, functions, features } = useGroupDeletePage()

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
          <AdminPageLayout.Title>{t('admin.groups.delete.title')}</AdminPageLayout.Title>
          <AdminPageLayout.Description>
            {!state.group && t('admin.groups.delete.description-empty')}
            {state.group && t('admin.groups.delete.description', { group: state.group.name })}
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

      {state.group && !state.isDeletedLocally && (
        <GroupForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.groups.delete.action')}
          submitClassName={styles.danger}
          note={t('admin.groups.delete.note')}
        >
          <FieldDescription>{t('admin.groups.delete.warning')}</FieldDescription>
          <features.form.Field name="confirmation">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="group-delete-confirmation">
                  {t('admin.groups.delete.confirm-label')}
                </FieldLabel>
                <Input
                  id="group-delete-confirmation"
                  name={field.name}
                  value={field.state.value}
                  placeholder={t('groups.name')}
                  autoComplete="off"
                  aria-invalid={!!field.state.meta.errors.length}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
                {!!field.state.meta.errors.length && (
                  <FieldError>{t('admin.groups.delete.confirm-error')}</FieldError>
                )}
              </Field>
            )}
          </features.form.Field>
        </GroupForm>
      )}

      {state.group && (
        <AlertDialog open={state.isDialogOpen} onOpenChange={functions.handleDialogOpenChange}>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>{t('action.delete.confirm-title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('admin.groups.delete.dialog-description', { group: state.group.name })}
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

      {state.group && state.isDeletedLocally && (
        <GroupResultPanel
          tone="local"
          title={t('admin.shared.local-result')}
          description={t('admin.groups.delete.result-description')}
          details={[
            {
              label: t('groups.label'),
              value: state.group.name,
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
