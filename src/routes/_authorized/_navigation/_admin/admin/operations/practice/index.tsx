import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useSearch } from '@tanstack/react-router'

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
import { PageLayout } from '#/routes/-components/page-layout'

import { AdminSelect, ApiErrorNotice } from '../../-components'
import { GROUP_FILTER_ALL } from '../../-constants'
import { PracticeGroupOption, PracticeResult } from './-components'
import { usePracticePage } from './-hooks'
import { PracticeSearchSchema } from './-schemas'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/operations/practice/')({
  head: () => ({ meta: [{ title: 'Практика групи | Robocoins' }] }),
  validateSearch: PracticeSearchSchema,
  component: PracticePage,
})

function PracticePage() {
  const search = useSearch({
    from: '/_authorized/_navigation/_admin/admin/operations/practice/',
  })

  return <PracticeContent key={search.groupId ?? 'none'} />
}

function PracticeContent() {
  const { state, functions } = usePracticePage()

  const t = useTranslate()

  const courseItems = [
    { value: GROUP_FILTER_ALL, label: t('filters.all-courses') },
    ...state.courses.map((course) => ({ value: String(course.id), label: course.name })),
  ]

  return (
    <PageLayout.Root className={styles.page}>
      <PageLayout.Header centered>
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/operations" />}
          title={t('admin.operations.back-to-list')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading className={styles.heading}>
          <PageLayout.Title>{t('group.practice.title')}</PageLayout.Title>
          <PageLayout.Description>
            {t('admin.operations.practice.description')}
          </PageLayout.Description>
        </PageLayout.Heading>
      </PageLayout.Header>

      <article className={styles.card}>
        <header className={styles['card-header']}>
          <h2 className={styles['card-title']}>{t('groups.select.placeholder')}</h2>
          <p className={styles['card-description']}>
            {t('admin.operations.practice.select-description')}
          </p>
        </header>

        {state.coursesIsPending && <Loader grow />}
        {state.coursesIsError && !!state.coursesErrorKind && (
          <ApiErrorNotice
            kind={state.coursesErrorKind}
            fallback={t('courses.error.load')}
            onRetry={functions.handleRetryCourses}
            isRetrying={state.coursesIsFetching}
            onLogin={functions.handleLogin}
          />
        )}

        {!state.coursesIsPending && !state.coursesIsError && (
          <>
            <div className={styles.controls}>
              <InputGroup>
                <InputGroupAddon aria-hidden="true">
                  <span className="i-ph:magnifying-glass" />
                </InputGroupAddon>
                <InputGroupInput
                  type="search"
                  value={state.query}
                  onChange={(event) => functions.handleQueryChange(event.target.value)}
                  placeholder={t('admin.operations.practice.search-placeholder')}
                  aria-label={t('groups.search.label')}
                  autoComplete="off"
                />
              </InputGroup>
              <AdminSelect
                value={state.courseFilter}
                onValueChange={functions.handleCourseFilterChange}
                items={courseItems}
                placeholder={t('filters.all-courses')}
                ariaLabel={t('filters.course')}
              />
            </div>

            {state.groupsIsPending && <Loader grow />}
            {state.groupsIsError && !!state.groupsErrorKind && (
              <ApiErrorNotice
                kind={state.groupsErrorKind}
                fallback={t('groups.error.load')}
                onRetry={functions.handleRetryGroups}
                isRetrying={state.groupsIsFetching}
                onLogin={functions.handleLogin}
              />
            )}

            {!state.groupsIsPending && !state.groupsIsError && (
              <>
                {!state.totalGroupCount && (
                  <div className={styles.empty}>
                    <span aria-hidden="true" className="i-ph:users-three" />
                    <p>{t('groups.empty')}</p>
                    <Button nativeButton={false} render={<Link to="/admin" />}>
                      {t('navigation.groups')}
                    </Button>
                  </div>
                )}
                {!!state.totalGroupCount && !state.groups.length && (
                  <p className={styles.empty}>{t('groups.empty-filtered')}</p>
                )}
                {!!state.groups.length && (
                  <div
                    className={styles.groups}
                    role="group"
                    aria-label={t('groups.select.placeholder')}
                  >
                    {state.groups.map((group) => (
                      <PracticeGroupOption
                        key={group.id}
                        group={group}
                        selected={state.selectedGroupId === group.id}
                        disabled={state.isAwarding || state.unknownResult}
                        onSelect={functions.handleSelectGroup}
                      />
                    ))}
                  </div>
                )}
                {state.selectedGroupMissing && (
                  <div className={styles.warning} role="alert">
                    <p>{t('admin.operations.practice.group-missing')}</p>
                    <Button variant="ghost" size="sm" onClick={functions.handleClearGroup}>
                      {t('admin.operations.practice.clear-selection')}
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {!!state.selectedGroup && (
          <section className={styles.selected}>
            <div className={styles['selected-heading']}>
              <h3 className={styles['selected-title']}>{state.selectedGroup.name}</h3>
              <p className={styles['selected-course']}>{state.selectedGroup.courseName}</p>
            </div>
            {state.groupIsPending && <Loader grow />}
            {state.groupIsError && !!state.groupErrorKind && (
              <ApiErrorNotice
                kind={state.groupErrorKind}
                fallback={t('admin.operations.practice.group-error')}
                onRetry={functions.handleRetryGroup}
                isRetrying={state.groupIsFetching}
                onLogin={functions.handleLogin}
              />
            )}
            {!state.groupIsPending && !state.groupIsError && (
              <p className={styles['selected-count']}>
                {t('group.students-count', { count: state.groupStudentsCount })}
              </p>
            )}
            <Button
              className={styles.submit}
              disabled={!state.canAward}
              aria-busy={state.isAwarding}
              onClick={functions.handleRequestAward}
            >
              {state.isAwarding && <Loader />}
              {t('admin.operations.practice.submit')}
            </Button>
            <p className={styles.note}>{t('admin.operations.practice.note')}</p>
          </section>
        )}

        {!!state.awardErrorKey && !!state.awardErrorKind && (
          <ApiErrorNotice
            kind={state.awardErrorKind}
            fallback={t.unsafe(state.awardErrorKey)}
            onLogin={functions.handleLogin}
          />
        )}

        {state.unknownResult && (
          <section className={styles.unknown} role="alert">
            <span aria-hidden="true" className={styles['unknown-icon']}>
              <span className="i-ph:warning-circle" />
            </span>
            <div className={styles['unknown-details']}>
              <h2 className={styles['unknown-title']}>{t('admin.balance.unknown.title')}</h2>
              <p className={styles['unknown-description']}>
                {t('admin.operations.practice.unknown-description')}
              </p>
              {state.unknownHistoryChecked && (
                <p className={styles['unknown-success']}>{t('admin.balance.unknown.checked')}</p>
              )}
              {state.unknownReadError && (
                <p className={styles['unknown-error']} role="status">
                  {t('admin.operations.practice.unknown-verify-error')}
                </p>
              )}
            </div>
            {!state.unknownHistoryChecked && (
              <Button
                variant="ghost"
                onClick={functions.handleVerifyUnknown}
                disabled={state.isVerifyingUnknown}
                aria-busy={state.isVerifyingUnknown}
              >
                {state.isVerifyingUnknown && <Loader />}
                {t('admin.balance.unknown.verify')}
              </Button>
            )}
            {state.unknownHistoryChecked && (
              <Button variant="ghost" onClick={functions.handleAcknowledgeUnknown}>
                {t('balance.acknowledge')}
              </Button>
            )}
          </section>
        )}
      </article>

      {!!state.awardResult && (
        <article className={styles.card}>
          <PracticeResult
            result={state.awardResult}
            studentNames={state.groupStudentNames}
            groupStudentsCount={state.groupStudentsCount}
            refreshError={state.refreshError}
            isRefreshing={state.isRefreshing}
            onReset={functions.handleResetAward}
            onRefreshData={functions.handleRefreshData}
          />
        </article>
      )}

      <AlertDialog open={state.isConfirmOpen} onOpenChange={functions.handleConfirmOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.operations.practice.confirm.title')}</AlertDialogTitle>
            {!!state.selectedGroup && (
              <AlertDialogDescription>
                {t('admin.operations.practice.confirm.description', {
                  group: state.selectedGroup.name,
                  count: state.groupStudentsCount,
                })}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={state.isAwarding}>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={functions.handleConfirmAward}
              disabled={state.isAwarding}
              aria-busy={state.isAwarding}
            >
              {state.isAwarding && <Loader />}
              {t('action.award')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout.Root>
  )
}
