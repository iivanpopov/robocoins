import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { getBalanceChangeReasonsExtBalanceBalanceChangeReasonsGetQueryOptions } from '#/api/hooks/useGetBalanceChangeReasonsExtBalanceBalanceChangeReasonsGet'
import { getCoursesCourseGetQueryOptions } from '#/api/hooks/useGetCoursesCourseGet'
import { getGroupByIdGroupIdGroupIdGetQueryOptions } from '#/api/hooks/useGetGroupByIdGroupIdGroupIdGet'
import { Avatar, AvatarFallback, AvatarImage, IconButton, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

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
  const { state, functions } = useGroupStudentsPage()

  const t = useTranslate()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <IconButton
          className={styles['back-btn']}
          nativeButton={false}
          render={<Link to="/group" />}
          title={t('group.back')}
        >
          <span className="i-ph:arrow-left" />
        </IconButton>
        <div className={styles['header-info']}>
          <h1 className={styles.title} title={state.courseName}>
            {state.courseName}
          </h1>
          <span className={styles.schedule}>
            {state.schedule.weekday && t.unsafe(`weekday.${state.schedule.weekday}`)}
            {state.schedule.weekday && state.schedule.time && ', '}
            {state.schedule.time}
          </span>
        </div>
      </header>

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
              <article
                key={student.id}
                className={styles['student-card']}
                onClick={() => functions.handleSelectStudent(student)}
              >
                <div className={styles['card-left']}>
                  <Avatar size="lg">
                    <AvatarImage src={getAvatarUrl(student.avatar)} alt={student.name} />
                    <AvatarFallback role="img" aria-label={student.name}>
                      {getInitial(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className={styles['student-name']}>{student.name}</span>
                </div>

                <div className={styles['card-right']}>
                  <div className={styles['balance-badge']}>
                    <span className={cn('i-ph:coins-bold', styles['coin-icon'])} />
                    <span>{student.balance}</span>
                  </div>
                  <span className={cn('i-ph:caret-right-bold', styles['caret-icon'])} />
                </div>
              </article>
            )
          })}
        </div>
      )}

      <StudentDrawer
        open={state.isDrawerOpen}
        groupId={state.groupId}
        student={state.selectedStudent}
        onOpenChange={functions.handleDrawerOpenChange}
        onOpenChangeComplete={functions.handleDrawerOpenChangeComplete}
      />
    </div>
  )
}
