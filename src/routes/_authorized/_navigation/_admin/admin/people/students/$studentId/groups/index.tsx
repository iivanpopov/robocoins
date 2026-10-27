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
  IconButton,
  Loader,
} from '#/components/ui'

import { StudentPageLayout } from '../-components'
import { parseStudentIdParams } from '../-utils'
import { ApiErrorNotice, StudentAvatar } from '../../-components'
import { AdminSelect, MembershipResultPanel } from '../../../../-components'
import { useStudentGroupsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/people/students/$studentId/groups/',
)({
  head: () => ({ meta: [{ title: 'Групи учня | Robocoins' }] }),
  params: { parse: (params) => parseStudentIdParams(params) },
  component: StudentGroupsRoute,
})

function StudentGroupsRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/people/students/$studentId/groups/',
  })

  return <StudentGroupsPage key={params.studentId} />
}

function StudentGroupsPage() {
  const { state, functions } = useStudentGroupsPage()

  const t = useTranslate()

  const addGroupItems = state.targetGroups.map((group) => ({
    value: String(group.id),
    label: t('admin.membership.group-option', {
      course: group.courseName,
      group: group.name,
    }),
  }))
  const transferSourceItems = state.memberships.map((group) => ({
    value: String(group.id),
    label: t('admin.membership.group-option', {
      course: group.courseName,
      group: group.name,
    }),
  }))
  const transferTargetItems = state.targetGroups.map((group) => ({
    value: String(group.id),
    label: t('admin.membership.group-option', {
      course: group.courseName,
      group: group.name,
    }),
  }))

  return (
    <StudentPageLayout
      title={t('admin.students.groups.title')}
      description={
        <>
          {!state.student && t('admin.students.groups.description-empty')}
          {!!state.student && t('admin.students.groups.description', { name: state.student.name })}
        </>
      }
      back={
        <IconButton
          nativeButton={false}
          render={
            <Link to="/admin/people/students/$studentId" params={{ studentId: state.studentId }} />
          }
          title={t('students.manage.back-to-profile')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
      {state.isPending && <Loader grow />}
      {state.isError && (
        <ApiErrorNotice
          kind={state.errorKind}
          fallback={t('admin.students.groups.error')}
          onRetry={functions.handleRetry}
          isRetrying={state.isRetrying}
          onLogin={functions.handleLogin}
        />
      )}

      {!!state.student && !state.isError && (
        <>
          <article className={styles.identity}>
            <StudentAvatar
              name={state.student.name}
              avatar={state.student.avatar}
              size="lg"
              className={styles.avatar}
            />
            <div className={styles['identity-copy']}>
              <span className={styles.name}>{state.student.name}</span>
              <span className={styles.hint}>
                {t('students.group-count', { count: state.memberships.length })}
              </span>
            </div>
          </article>

          {!!state.membership.results.length && state.membership.mode && (
            <MembershipResultPanel
              mode={state.membership.mode}
              results={state.membership.results}
              sourceGroupName={state.resultSourceGroupName}
              targetGroupName={state.resultTargetGroupName}
              isOperating={state.membership.isOperating}
              hasFailures={state.membership.hasFailures}
              hasUnknown={state.membership.hasUnknown}
              hasPartial={state.membership.hasPartial}
              hasSessionFailure={state.membership.hasSessionFailure}
              hasForbiddenFailure={state.membership.hasForbiddenFailure}
              onRetry={functions.handleRetryMembership}
              onReset={functions.handleResetMembership}
              onLogin={functions.handleLogin}
            />
          )}

          <section className={styles.section}>
            <header className={styles['section-header']}>
              <h2 className={styles['section-title']}>{t('admin.students.groups.add.title')}</h2>
              <p className={styles.note}>{t('admin.students.groups.add.description')}</p>
            </header>

            {!!state.targetGroups.length && (
              <div className={styles.controls}>
                <AdminSelect
                  value={state.addTargetValue}
                  onValueChange={functions.handleAddTargetChange}
                  items={addGroupItems}
                  placeholder={t('admin.students.groups.add.placeholder')}
                  ariaLabel={t('admin.students.groups.add.target-label')}
                  disabled={state.membership.isOperating}
                />
                <Button
                  onClick={functions.handleAdd}
                  disabled={!state.canAdd}
                  aria-busy={state.membership.isOperating}
                >
                  {state.membership.isOperating && state.membership.mode === 'add' && <Loader />}
                  {t('admin.students.groups.add.submit')}
                </Button>
              </div>
            )}
            {!state.targetGroups.length && (
              <p className={styles.empty}>{t('admin.students.groups.add.empty')}</p>
            )}
          </section>

          <section className={styles.section}>
            <header className={styles['section-header']}>
              <h2 className={styles['section-title']}>
                {t('admin.students.groups.transfer.title')}
              </h2>
              <p className={styles.note}>{t('admin.students.groups.transfer.description')}</p>
            </header>

            {!state.memberships.length && (
              <p className={styles.empty}>{t('admin.students.groups.transfer.source-empty')}</p>
            )}
            {!!state.memberships.length && !state.targetGroups.length && (
              <p className={styles.empty}>{t('admin.students.groups.transfer.target-empty')}</p>
            )}
            {!!state.memberships.length && !!state.targetGroups.length && (
              <div className={styles['transfer-controls']}>
                <AdminSelect
                  value={state.transferSourceValue}
                  onValueChange={functions.handleTransferSourceChange}
                  items={transferSourceItems}
                  placeholder={t('admin.students.groups.transfer.placeholder')}
                  ariaLabel={t('admin.students.groups.transfer.source-label')}
                  disabled={state.membership.isOperating}
                />
                <AdminSelect
                  value={state.transferTargetValue}
                  onValueChange={functions.handleTransferTargetChange}
                  items={transferTargetItems}
                  placeholder={t('admin.students.groups.transfer.placeholder')}
                  ariaLabel={t('admin.students.groups.transfer.target-label')}
                  disabled={state.membership.isOperating}
                />
                <Button
                  onClick={functions.handleOpenTransferDialog}
                  disabled={!state.canTransfer}
                  aria-busy={state.membership.isOperating}
                >
                  {state.membership.isOperating && state.membership.mode === 'transfer' && (
                    <Loader />
                  )}
                  {t('admin.students.groups.transfer.submit')}
                </Button>
              </div>
            )}
          </section>

          <section className={styles.section}>
            <header className={styles['section-header']}>
              <h2 className={styles['section-title']}>
                {t('admin.students.groups.memberships.title')}
              </h2>
              <p className={styles.note}>{t('admin.students.groups.memberships.description')}</p>
            </header>

            {!state.memberships.length && (
              <p className={styles.empty}>{t('students.profile.memberships.empty')}</p>
            )}
            {!!state.memberships.length && (
              <div className={styles.memberships}>
                {state.memberships.map((group) => (
                  <article key={group.id} className={styles.membership}>
                    <div className={styles['membership-copy']}>
                      <span className={styles['membership-course']}>{group.courseName}</span>
                      <span className={styles['membership-group']}>{group.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => functions.handleOpenRemoveDialog(group.id)}
                      disabled={state.membership.isOperating}
                      aria-label={t('admin.students.groups.memberships.remove-label', {
                        group: group.name,
                      })}
                    >
                      {t('admin.students.groups.memberships.remove')}
                    </Button>
                  </article>
                ))}
              </div>
            )}
          </section>

          <AlertDialog
            open={state.isRemoveDialogOpen}
            onOpenChange={functions.handleRemoveDialogOpenChange}
          >
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t('admin.students.groups.remove.dialog-title')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t('admin.students.groups.remove.dialog-description', {
                    student: state.student.name,
                    group: state.removalGroupName ?? '',
                  })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={state.membership.isOperating}>
                  {t('action.cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={functions.handleConfirmRemove}
                  disabled={state.membership.isOperating}
                >
                  {t('admin.students.groups.remove.dialog-action')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog
            open={state.isTransferDialogOpen}
            onOpenChange={functions.handleTransferDialogOpenChange}
          >
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t('admin.students.groups.transfer.dialog-title')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t('admin.students.groups.transfer.dialog-description', {
                    student: state.student.name,
                    source: state.sourceGroupName ?? '',
                    target: state.transferTargetGroupName ?? '',
                  })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <p className={styles['dialog-note']}>
                {t('admin.students.groups.transfer.dialog-note')}
              </p>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={state.membership.isOperating}>
                  {t('action.cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={functions.handleConfirmTransfer}
                  disabled={state.membership.isOperating}
                >
                  {t('admin.students.groups.transfer.dialog-action')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </StudentPageLayout>
  )
}
