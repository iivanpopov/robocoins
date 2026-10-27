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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { GroupEmptyState, GroupPageLayout, GroupRequestError } from '../../-components'
import { parseGroupIdParams } from '../../-utils'
import { AdminSelect, MembershipResultPanel } from '../../../-components'
import { MembershipStudentOption } from './-components'
import { useGroupStudentsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/groups/$groupId/students/',
)({
  head: () => ({ meta: [{ title: 'Склад групи | Robocoins' }] }),
  params: { parse: (params) => parseGroupIdParams(params) },
  component: GroupStudentsRoute,
})

function GroupStudentsRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/groups/$groupId/students/',
  })

  return <GroupStudentsPage key={params.groupId} />
}

function GroupStudentsPage() {
  const { state, functions } = useGroupStudentsPage()

  const t = useTranslate()

  const targetGroupItems = state.targetGroups.map((group) => ({
    value: String(group.id),
    label: t('admin.membership.group-option', {
      course: group.courseName,
      group: group.name,
    }),
  }))

  return (
    <GroupPageLayout
      title={t('admin.groups.membership.title')}
      description={
        <>
          {!state.group && t('admin.groups.membership.description-empty')}
          {!!state.group && t('admin.groups.membership.description', { group: state.group.name })}
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
      {state.isError && state.groupErrorKey && (
        <GroupRequestError
          messageKey={state.groupErrorKey}
          onRetry={functions.handleRetryGroup}
          isRetrying={state.isGroupFetching}
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

      {!!state.group && !state.isError && (
        <>
          <section className={styles.summary}>
            <div className={styles.stat}>
              <span className={styles['stat-value']}>{state.studentsCount}</span>
              <span className={styles['stat-label']}>
                {t('admin.groups.detail.students-count')}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles['stat-value']}>{state.availableCount}</span>
              <span className={styles['stat-label']}>{t('admin.groups.membership.available')}</span>
            </div>
          </section>

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
              <h2 className={styles['section-title']}>{t('admin.groups.membership.add.title')}</h2>
              <p className={styles.note}>{t('admin.groups.membership.add.description')}</p>
            </header>

            {!state.hasStudentList && (
              <p className={styles.note}>{t('admin.groups.membership.add.list-unavailable')}</p>
            )}
            {state.hasStudentList && state.isStudentsPending && <Loader grow />}
            {state.hasStudentList && state.isStudentsError && (
              <div className={styles.error}>
                <InlineError
                  onRetry={functions.handleRetryStudents}
                  isRetrying={state.isStudentsFetching}
                >
                  {t('students.error.load')}
                </InlineError>
                {state.studentsErrorStatus === 401 && (
                  <Button variant="ghost" onClick={functions.handleLogin}>
                    {t('students.action.login')}
                  </Button>
                )}
              </div>
            )}
            {state.hasStudentList && !state.isStudentsPending && !state.isStudentsError && (
              <>
                <InputGroup>
                  <InputGroupAddon aria-hidden="true">
                    <span className="i-ph:magnifying-glass" />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="search"
                    value={state.search}
                    onChange={(event) => functions.handleSearchChange(event.target.value)}
                    placeholder={t('admin.groups.membership.add.search-placeholder')}
                    aria-label={t('admin.groups.membership.add.search-label')}
                    autoComplete="off"
                  />
                </InputGroup>

                {!state.availableCount && (
                  <p className={styles.empty}>{t('admin.groups.membership.add.empty')}</p>
                )}
                {!!state.availableCount && !state.candidateCount && (
                  <p className={styles.empty}>{t('admin.groups.membership.add.empty-filtered')}</p>
                )}
                {!!state.candidateCount && (
                  <div className={styles.list}>
                    {state.candidates.map((student) => (
                      <MembershipStudentOption
                        key={student.id}
                        id={`group-add-${student.id}`}
                        student={student}
                        checked={state.selectedCandidateIds.includes(student.id)}
                        disabled={state.membership.isOperating}
                        meta={t('students.group-count', { count: student.groupIds.length })}
                        onCheckedChange={functions.handleCandidateToggle}
                      />
                    ))}
                  </div>
                )}

                <div className={styles.actions}>
                  <Button
                    onClick={functions.handleAddSelected}
                    disabled={!state.selectedCandidateCount || state.membership.isOperating}
                    aria-busy={state.membership.isOperating}
                  >
                    {state.membership.isOperating && state.membership.mode === 'add' && <Loader />}
                    {t('admin.groups.membership.add.submit', {
                      count: state.selectedCandidateCount,
                    })}
                  </Button>
                </div>
              </>
            )}
          </section>

          <section className={styles.section}>
            <header className={styles['section-header']}>
              <h2 className={styles['section-title']}>
                {t('admin.groups.membership.students.title')}
              </h2>
              <p className={styles.note}>{t('admin.groups.membership.students.description')}</p>
            </header>

            {!state.hasStudentList && (
              <p className={styles.note}>{t('admin.groups.detail.students-unavailable')}</p>
            )}
            {state.hasStudentList && !state.students.length && (
              <p className={styles.empty}>{t('admin.groups.detail.students-empty')}</p>
            )}
            {!!state.students.length && (
              <div className={styles.list}>
                {state.students.map((student) => (
                  <MembershipStudentOption
                    key={student.id}
                    id={`group-member-${student.id}`}
                    student={student}
                    checked={state.selectedMemberIds.includes(student.id)}
                    disabled={state.membership.isOperating}
                    meta={t('students.group-count', { count: student.groupIds.length })}
                    onCheckedChange={functions.handleMemberToggle}
                  />
                ))}
              </div>
            )}

            {!!state.students.length && (
              <div className={styles.actions}>
                <Button
                  variant="ghost"
                  onClick={functions.handleOpenRemoveDialog}
                  disabled={!state.selectedMemberCount || state.membership.isOperating}
                >
                  {t('admin.groups.membership.remove.submit', {
                    count: state.selectedMemberCount,
                  })}
                </Button>
              </div>
            )}

            {!!state.students.length && (
              <div className={styles.transfer}>
                <h3 className={styles.subtitle}>{t('admin.groups.membership.transfer.title')}</h3>
                <p className={styles.note}>{t('admin.groups.membership.transfer.description')}</p>
                {state.isCoursesPending && <Loader grow />}
                {state.isCoursesError && (
                  <div className={styles.error}>
                    <InlineError
                      onRetry={functions.handleRetryCourses}
                      isRetrying={state.isCoursesFetching}
                    >
                      {t('admin.groups.membership.transfer.groups-error')}
                    </InlineError>
                    {state.coursesErrorStatus === 401 && (
                      <Button variant="ghost" onClick={functions.handleLogin}>
                        {t('students.action.login')}
                      </Button>
                    )}
                  </div>
                )}
                {!state.isCoursesPending &&
                  !state.isCoursesError &&
                  !!state.targetGroups.length && (
                    <>
                      <AdminSelect
                        value={state.targetGroupValue}
                        onValueChange={functions.handleTargetGroupChange}
                        items={targetGroupItems}
                        placeholder={t('admin.groups.membership.transfer.placeholder')}
                        ariaLabel={t('admin.groups.membership.transfer.target-label')}
                        disabled={state.membership.isOperating}
                      />
                      <div className={styles.actions}>
                        <Button
                          onClick={functions.handleOpenTransferDialog}
                          disabled={
                            !state.targetGroupName ||
                            !state.selectedMemberCount ||
                            state.membership.isOperating
                          }
                          aria-busy={state.membership.isOperating}
                        >
                          {state.membership.isOperating && state.membership.mode === 'transfer' && (
                            <Loader />
                          )}
                          {t('admin.groups.membership.transfer.submit', {
                            count: state.selectedMemberCount,
                          })}
                        </Button>
                      </div>
                    </>
                  )}
                {!state.isCoursesPending && !state.isCoursesError && !state.targetGroups.length && (
                  <p className={styles.note}>
                    {t('admin.groups.membership.transfer.targets-empty')}
                  </p>
                )}
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
                  {t('admin.groups.membership.remove.dialog-title')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t('admin.groups.membership.remove.dialog-description', {
                    group: state.group.name,
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
                  {t('admin.groups.membership.remove.dialog-action')}
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
                  {t('admin.groups.membership.transfer.dialog-title')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t('admin.groups.membership.transfer.dialog-description', {
                    source: state.group.name,
                    target: state.targetGroupName ?? '',
                  })}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <p className={styles['dialog-note']}>
                {t('admin.groups.membership.transfer.dialog-note')}
              </p>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={state.membership.isOperating}>
                  {t('action.cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={functions.handleConfirmTransfer}
                  disabled={state.membership.isOperating}
                >
                  {t('admin.groups.membership.transfer.dialog-action')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </GroupPageLayout>
  )
}
