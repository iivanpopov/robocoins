import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from 'cn'

import { IconButton, Loader } from '#/components/ui'
import { getAvatarUrl } from '#/routes/-utils/get-avatar-url'

import { StudentDrawer, StudentSearchBar } from './-components'
import { useGroupStudentsPage } from './-hooks'

import styles from './$groupId.module.css'

export const Route = createFileRoute('/_authorized/_teacher/group/$groupId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { state, functions, queries, mutations } = useGroupStudentsPage()

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
          <span className={styles.schedule} title={state.schedule}>
            {state.schedule}
          </span>
        </div>
      </header>

      <StudentSearchBar
        searchQuery={state.searchQuery}
        onSearchChange={functions.handleSearchChange}
        sortOrder={state.sortOrder}
        onSortChange={functions.handleSortChange}
      />

      {state.isPending && (
        <div className="flex flex-1 justify-center items-center">
          <Loader />
        </div>
      )}
      {state.isError && <div role="alert">{t('group.error')}</div>}
      {!state.isPending && !state.isError && !state.hasStudents && (
        <div className={styles.empty}>{t('student.empty')}</div>
      )}

      {state.hasStudents && (
        <div className={styles['student-list']}>
          {state.students.map((student) => {
            return (
              <article
                key={student.id}
                className={styles['student-card']}
                onClick={() => functions.handleSelectStudent(student.id)}
              >
                <div className={styles['card-left']}>
                  <img
                    src={getAvatarUrl(student.avatar)}
                    alt={student.name}
                    className={styles.avatar}
                    draggable={false}
                  />
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
        student={state.selectedStudent}
        awards={state.studentAwards}
        onOpenChange={functions.handleDrawerOpenChange}
        onAward={functions.handleAward}
        isPending={mutations.createAward.isPending}
        isError={mutations.createAward.isError}
        isHistoryPending={queries.awards.isPending}
        isHistoryError={queries.awards.isError}
      />
    </div>
  )
}
