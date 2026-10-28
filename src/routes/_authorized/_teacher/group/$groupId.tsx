import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getGroupByIdGroupIdGroupIdGetQueryOptions } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Button,
  IconButton,
  Loader,
} from '#/components/ui'
import { InlineError, PageLayout, UserCard } from '#/routes/-components'

import { StudentDrawer, StudentSearchBar } from './-components'
import { useGroupStudentsPage } from './-hooks'

import styles from './$groupId.module.css'

export const Route = createFileRoute('/_authorized/_teacher/group/$groupId')({
  loader: async ({ context, params }) =>
    Promise.all([
      context.queryClient.query(
        getGroupByIdGroupIdGroupIdGetQueryOptions({ path: { group_id: Number(params.groupId) } }),
      ),
      context.queryClient.query(getCoursesCourseGetQueryOptions()),
      context.queryClient.query(
        getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions(),
      ),
    ]),
  component: GroupStudentsPage,
})

function GroupStudentsPage() {
  const { state, mutations, functions } = useGroupStudentsPage()

  const t = useTranslate()

  return (
    <PageLayout.Root spacing="compact" bottomSpace className={styles.page}>
      <PageLayout.Header align="end" centered size="compact">
        <IconButton nativeButton={false} render={<Link to="/group" />} title={t('group.back')}>
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title title={state.courseName}>{state.courseName}</PageLayout.Title>
          <PageLayout.Description>
            {state.schedule.weekday && t.unsafe(`weekday.${state.schedule.weekday}`)}
            {state.schedule.weekday && state.schedule.time && ', '}
            {state.schedule.time}
          </PageLayout.Description>
        </PageLayout.Heading>
      </PageLayout.Header>

      <StudentSearchBar
        searchQuery={state.searchQuery}
        onSearchChange={functions.handleSearchChange}
        sortOrder={state.sortOrder}
        onSortChange={functions.handleSortChange}
      />

      {state.isPending && <Loader grow className={styles.loader} />}
      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isRetrying}>
          {t('group.error')}
        </InlineError>
      )}
      {!state.isPending && !state.isError && !state.hasStudents && (
        <div className={styles.empty}>
          {!state.searchQuery && t('student.group-empty')}
          {state.searchQuery && t('student.empty')}
        </div>
      )}

      {state.hasStudents && (
        <div className={styles['student-list']}>
          {state.students.map((student) => {
            return (
              <UserCard.Root
                key={student.id}
                render={
                  <button type="button" onClick={() => functions.handleSelectStudent(student)} />
                }
              >
                <UserCard.Avatar name={student.name} avatar={student.avatar} />
                <UserCard.Content>
                  <UserCard.Name>{student.name}</UserCard.Name>
                </UserCard.Content>
                <UserCard.Meta>
                  <UserCard.Balance value={student.balance} />
                  <UserCard.Indicator />
                </UserCard.Meta>
              </UserCard.Root>
            )
          })}
        </div>
      )}

      <div className={styles['practice-award']}>
        <AlertDialog
          open={state.isPracticeDialogOpen}
          onOpenChange={functions.handlePracticeDialogOpenChange}
        >
          <AlertDialogTrigger
            render={<Button className={styles['practice-award-btn']} />}
            disabled={!state.canAwardPractice || mutations.awardPractice.isPending}
          >
            <span aria-hidden="true" className="i-ph:coins" />
            {t('group.practice.award')}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('group.practice.confirm.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('group.practice.confirm.description', { count: state.studentsCount })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {mutations.awardPractice.isError && (
              <InlineError>{t('group.practice.error')}</InlineError>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel disabled={mutations.awardPractice.isPending}>
                {t('action.cancel')}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={functions.handleAwardPractice}
                disabled={!state.canAwardPractice || mutations.awardPractice.isPending}
                aria-busy={mutations.awardPractice.isPending}
              >
                {mutations.awardPractice.isPending && <Loader />}
                {t('action.award')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <StudentDrawer
        open={state.isDrawerOpen}
        groupId={state.groupId}
        student={state.selectedStudent}
        onOpenChange={functions.handleDrawerOpenChange}
        onOpenChangeComplete={functions.handleDrawerOpenChangeComplete}
      />
    </PageLayout.Root>
  )
}
