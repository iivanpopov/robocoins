import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, IconButton, Loader } from '#/components/ui'

import {
  CourseEmptyState,
  CourseGroupRow,
  CoursePageLayout,
  CourseRequestError,
} from '../-components'
import { useCourseDetailsPage } from '../-hooks'
import { parseCourseIdParams } from '../-utils'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/courses/$courseId/')({
  head: () => ({ meta: [{ title: 'Курс | Robocoins' }] }),
  params: { parse: (params) => parseCourseIdParams(params) },
  component: CourseDetailsPage,
})

function CourseDetailsPage() {
  const { state, functions } = useCourseDetailsPage()

  const t = useTranslate()

  return (
    <CoursePageLayout
      title={
        <>
          {!state.course && t('admin.courses.detail.title')}
          {state.course && state.course.name}
        </>
      }
      description={state.course && t('course.category', { category: state.course.category })}
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/courses" />}
          title={t('admin.courses.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
      {state.isCoursesPending && <Loader grow />}
      {state.isCoursesError && state.coursesErrorKey && (
        <CourseRequestError
          messageKey={state.coursesErrorKey}
          onRetry={functions.handleRetryCourses}
          isRetrying={state.isCoursesFetching}
        />
      )}
      {state.isNotFound && (
        <CourseEmptyState
          icon="i-ph:books-duotone"
          title={t('admin.courses.not-found.title')}
          description={t('admin.courses.not-found.description')}
        >
          <Button nativeButton={false} render={<Link to="/admin/courses" />}>
            {t('admin.courses.back')}
          </Button>
        </CourseEmptyState>
      )}

      {state.course && (
        <>
          <section className={styles.meta}>
            <div className={styles['meta-row']}>
              <span className={styles['meta-label']}>{t('admin.courses.detail.category')}</span>
              <span className={styles['meta-value']}>
                {t('course.category', { category: state.course.category })}
              </span>
            </div>
            <div className={styles['meta-row']}>
              <span className={styles['meta-label']}>{t('admin.courses.detail.groups')}</span>
              <span className={styles['meta-value']}>
                {t('admin.courses.groups-count', { count: state.groupsCount })}
              </span>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('admin.courses.detail.groups')}</h2>
            {state.isGroupsPending && <Loader />}
            {state.isGroupsError && state.groupsErrorKey && (
              <CourseRequestError
                messageKey={state.groupsErrorKey}
                onRetry={functions.handleRetryGroups}
                isRetrying={state.isGroupsFetching}
              />
            )}
            {!state.isGroupsPending && !state.isGroupsError && !state.groups.length && (
              <p className={styles.empty}>{t('admin.courses.detail.groups-empty')}</p>
            )}
            {!!state.groups.length && (
              <div className={styles.groups}>
                {state.groups.map((group) => (
                  <CourseGroupRow key={group.id} group={group} />
                ))}
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('admin.courses.detail.manage')}</h2>
            <p className={styles.note}>{t('admin.courses.detail.local-note')}</p>
            <div className={styles.actions}>
              <Link
                to="/admin/courses/$courseId/rename"
                params={{ courseId: state.courseId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="rename">
                  <span className="i-ph:pencil-simple-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.courses.detail.rename')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.courses.detail.rename-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
              <Link
                to="/admin/courses/$courseId/category"
                params={{ courseId: state.courseId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="category">
                  <span className="i-ph:shapes-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>
                    {t('admin.courses.detail.change-category')}
                  </span>
                  <span className={styles['action-description']}>
                    {t('admin.courses.detail.change-category-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
              <Link
                to="/admin/courses/$courseId/delete"
                params={{ courseId: state.courseId }}
                className={styles.action}
                data-tone="error"
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="delete">
                  <span className="i-ph:trash-duotone" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.courses.detail.delete')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.courses.detail.delete-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right-bold" />
              </Link>
            </div>
          </section>
        </>
      )}
    </CoursePageLayout>
  )
}
