import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { IconButton, Loader } from '#/components/ui'

import {
  GroupEmptyState,
  GroupPageLayout,
  GroupRequestError,
  GroupStudentRow,
  GroupTeacherRow,
} from '../-components'
import { useGroupDetailsPage } from '../-hooks'
import { parseGroupIdParams } from '../-utils'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/groups/$groupId/')({
  head: () => ({ meta: [{ title: 'Група | Robocoins' }] }),
  params: { parse: (params) => parseGroupIdParams(params) },
  component: GroupDetailsPage,
})

function GroupDetailsPage() {
  const { state, functions } = useGroupDetailsPage()

  const t = useTranslate()

  const groupName = state.group?.name ?? t('admin.groups.detail.title')

  return (
    <GroupPageLayout
      title={groupName}
      description={
        <>
          {state.course && <>{state.course.name}</>}
          {!state.course && state.group && (
            <>
              {t('admin.groups.detail.course-fallback', {
                id: state.group.course_id,
              })}
            </>
          )}
          {!state.group && <>{t('admin.groups.detail.description-empty')}</>}
        </>
      }
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin" />}
          title={t('admin.groups.back')}
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
          <Link to="/admin" className={styles.back}>
            {t('admin.groups.back')}
          </Link>
        </GroupEmptyState>
      )}

      {state.group && (
        <>
          <section className={styles.meta}>
            <div className={styles['meta-row']}>
              <span className={styles['meta-label']}>
                {t('admin.groups.detail.students-count')}
              </span>
              <span className={styles['meta-value']}>
                {t('group.students-count', { count: state.studentsCount })}
              </span>
            </div>
            <div className={styles['meta-row']}>
              <span className={styles['meta-label']}>
                {t('admin.groups.detail.teachers-count')}
              </span>
              <span className={styles['meta-value']}>
                {t('admin.groups.teachers-count', { count: state.teachersCount })}
              </span>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('admin.groups.detail.teachers')}</h2>
            {!state.teachers.length && (
              <p className={styles.empty}>{t('admin.groups.detail.teachers-empty')}</p>
            )}
            {!!state.teachers.length && (
              <div className={styles.list}>
                {state.teachers.map((teacher) => (
                  <GroupTeacherRow
                    key={teacher.userId}
                    userId={teacher.userId}
                    name={teacher.name}
                  />
                ))}
              </div>
            )}
          </section>

          <section className={styles.section}>
            <div className={styles['section-header']}>
              <h2 className={styles['section-title']}>{t('admin.groups.detail.students')}</h2>
              <Link
                to="/admin/groups/$groupId/students"
                params={{ groupId: state.groupId }}
                className={styles['students-link']}
              >
                <span aria-hidden="true" className="i-ph:users-three-duotone" />
                <span>{t('admin.groups.detail.students-manage')}</span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
            </div>
            {!state.students.length && !state.studentsCount && (
              <p className={styles.empty}>{t('admin.groups.detail.students-empty')}</p>
            )}
            {!state.students.length && !!state.studentsCount && (
              <p className={styles.empty}>{t('admin.groups.detail.students-unavailable')}</p>
            )}
            {!!state.students.length && (
              <div className={styles.list}>
                {state.students.map((student) => (
                  <GroupStudentRow key={student.id} student={student} />
                ))}
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('admin.groups.detail.manage')}</h2>
            <div className={styles.actions}>
              <Link
                to="/admin/operations/practice"
                search={{ groupId: state.groupId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="practice">
                  <span className="i-ph:check-circle-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>
                    {t('admin.groups.detail.practice')}
                  </span>
                  <span className={styles['action-description']}>
                    {t('admin.groups.detail.practice-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
              <Link
                to="/admin/groups/$groupId/teachers"
                params={{ groupId: state.groupId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="teacher">
                  <span className="i-ph:chalkboard-teacher-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.groups.teachers.entry')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.groups.teachers.entry-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
              <Link
                to="/admin/groups/$groupId/rename"
                params={{ groupId: state.groupId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="rename">
                  <span className="i-ph:pencil-simple-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.groups.detail.rename')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.groups.detail.rename-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
              <Link
                to="/admin/groups/$groupId/course"
                params={{ groupId: state.groupId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="course">
                  <span className="i-ph:books-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>
                    {t('admin.groups.detail.change-course')}
                  </span>
                  <span className={styles['action-description']}>
                    {t('admin.groups.detail.change-course-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
              <Link
                to="/admin/groups/$groupId/delete"
                params={{ groupId: state.groupId }}
                className={styles.action}
                data-tone="error"
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="delete">
                  <span className="i-ph:trash-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.groups.detail.delete')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.groups.detail.delete-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
            </div>
          </section>
        </>
      )}
    </GroupPageLayout>
  )
}
