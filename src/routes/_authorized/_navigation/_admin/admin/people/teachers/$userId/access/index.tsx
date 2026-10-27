import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  IconButton,
  Loader,
} from '#/components/ui'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { TeacherRequestError, TeacherResultPanel, TeacherUnavailable } from '../../-components'
import { TeacherAccessAction } from '../../-constants'
import { useTeacherAccessPage } from '../../-hooks'
import { parseTeacherIdParams } from '../../-utils'

import styles from './index.module.css'

const ACCESS_ACTIONS = [
  {
    value: TeacherAccessAction.Block,
    icon: 'i-ph:lock-simple-duotone',
    title: 'admin.teachers.access.block',
    description: 'admin.teachers.access.block-description',
    confirmTitle: 'admin.teachers.access.block-confirm-title',
    confirmDescription: 'admin.teachers.access.block-confirm-description',
    confirmLabel: 'admin.teachers.access.block-confirm-action',
    resultTitle: 'admin.teachers.access.block-result-title',
    resultDescription: 'admin.teachers.access.block-result-description',
    resultAction: 'admin.teachers.access.block-result-action',
  },
  {
    value: TeacherAccessAction.Unblock,
    icon: 'i-ph:lock-simple-open-duotone',
    title: 'admin.teachers.access.unblock',
    description: 'admin.teachers.access.unblock-description',
    confirmTitle: 'admin.teachers.access.unblock-confirm-title',
    confirmDescription: 'admin.teachers.access.unblock-confirm-description',
    confirmLabel: 'admin.teachers.access.unblock-confirm-action',
    resultTitle: 'admin.teachers.access.unblock-result-title',
    resultDescription: 'admin.teachers.access.unblock-result-description',
    resultAction: 'admin.teachers.access.unblock-result-action',
  },
  {
    value: TeacherAccessAction.ResetCode,
    icon: 'i-ph:key-duotone',
    title: 'admin.teachers.access.reset-code',
    description: 'admin.teachers.access.reset-code-description',
    confirmTitle: 'access.code.reset-confirm-title',
    confirmDescription: 'admin.teachers.access.reset-code-confirm-description',
    confirmLabel: 'admin.teachers.access.reset-code-confirm-action',
    resultTitle: 'admin.teachers.access.reset-code-result-title',
    resultDescription: 'admin.teachers.access.reset-code-result-description',
    resultAction: 'admin.teachers.access.reset-code-result-action',
  },
  {
    value: TeacherAccessAction.RevokeSessions,
    icon: 'i-ph:sign-out-duotone',
    title: 'access.sessions.end',
    description: 'admin.teachers.access.revoke-sessions-description',
    confirmTitle: 'access.sessions.confirm-title',
    confirmDescription: 'admin.teachers.access.revoke-sessions-confirm-description',
    confirmLabel: 'admin.teachers.access.revoke-sessions-confirm-action',
    resultTitle: 'access.sessions.result-title',
    resultDescription: 'admin.teachers.access.revoke-sessions-result-description',
    resultAction: 'admin.teachers.access.revoke-sessions-result-action',
  },
] as const

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/teachers/$userId/access/',
)({
  head: () => ({ meta: [{ title: 'Доступ викладача | Robocoins' }] }),
  params: { parse: (params) => parseTeacherIdParams(params) },
  component: TeacherAccessRoute,
})

function TeacherAccessRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/teachers/$userId/access/',
  })

  return <TeacherAccessPage key={params.userId} />
}

function TeacherAccessPage() {
  const { state, functions } = useTeacherAccessPage()

  const t = useTranslate()

  const pendingActionItem = ACCESS_ACTIONS.find(
    (actionItem) => actionItem.value === state.pendingAction,
  )
  const completedActionItem = ACCESS_ACTIONS.find(
    (actionItem) => actionItem.value === state.completedAction,
  )

  return (
    <AdminPageLayout.Root bottomSpace>
      <AdminPageLayout.Header>
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/people/teachers/$userId" params={{ userId: state.teacherId }} />}
          title={t('navigation.profile')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title>{t('admin.teachers.access.title')}</AdminPageLayout.Title>
          <AdminPageLayout.Description>
            {!state.isAvailable && t('admin.teachers.access.description-empty')}
            {state.isAvailable && t('admin.teachers.access.description', { name: state.name })}
          </AdminPageLayout.Description>
        </AdminPageLayout.Heading>
      </AdminPageLayout.Header>
      {state.isPending && <Loader grow />}
      {!state.isPending && state.isError && !state.notFound && (
        <TeacherRequestError
          status={state.errorStatus}
          message={t('admin.teachers.profile.error')}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
        />
      )}
      <TeacherUnavailable
        notFound={state.notFound}
        notTeacher={state.notTeacher}
        isMismatch={state.isMismatch}
      />

      {state.isAvailable && !state.completedAction && (
        <section className={styles.section}>
          <p className={styles.note}>{t('admin.teachers.access.note')}</p>
          <h2 className={styles['section-title']}>{t('admin.teachers.access.actions')}</h2>
          <div className={styles.actions}>
            {ACCESS_ACTIONS.map((actionItem) => (
              <button
                key={actionItem.value}
                type="button"
                className={styles.action}
                onClick={() => functions.handleActionSelect(actionItem.value)}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className={actionItem.icon} />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t(actionItem.title)}</span>
                  <span className={styles['action-description']}>{t(actionItem.description)}</span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </button>
            ))}
          </div>
        </section>
      )}

      {state.isAvailable && completedActionItem && (
        <TeacherResultPanel
          title={t(completedActionItem.resultTitle)}
          description={t(completedActionItem.resultDescription)}
          details={[
            {
              label: t('role.teacher'),
              value: state.name,
            },
            {
              label: t('field.action.label'),
              value: t(completedActionItem.resultAction),
            },
          ]}
        >
          <div className={styles['result-actions']}>
            <Button
              nativeButton={false}
              render={
                <Link to="/admin/people/teachers/$userId" params={{ userId: state.teacherId }} />
              }
            >
              {t('navigation.profile')}
            </Button>
            <Button type="button" variant="ghost" onClick={functions.handleResetResult}>
              {t('admin.teachers.access.again')}
            </Button>
          </div>
        </TeacherResultPanel>
      )}

      <Drawer
        open={!!state.pendingAction}
        onOpenChange={functions.handleDrawerOpenChange}
        showSwipeHandle
      >
        <DrawerContent>
          {pendingActionItem && (
            <div className={styles.sheet}>
              <DrawerHeader>
                <DrawerTitle>{t(pendingActionItem.confirmTitle)}</DrawerTitle>
                <DrawerDescription>
                  {t(pendingActionItem.confirmDescription, { name: state.name })}
                </DrawerDescription>
              </DrawerHeader>
              <div className={styles['sheet-actions']}>
                <Button type="button" onClick={functions.handleConfirm}>
                  {t(pendingActionItem.confirmLabel)}
                </Button>
                <Button type="button" variant="ghost" onClick={functions.handleCancel}>
                  {t('action.cancel')}
                </Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </AdminPageLayout.Root>
  )
}
