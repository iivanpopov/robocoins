import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, IconButton, Loader } from '#/components/ui'
import { PageLayout } from '#/routes/-components/page-layout'

import { CourseEmptyState, CourseGroupRow, CourseRequestError } from '../-components'
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
    <PageLayout.Root>
      <PageLayout.Header align="end">
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/courses" />}
          title={t('admin.courses.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>
            {!state.course && t('courses.label')}
            {state.course && state.course.name}
          </PageLayout.Title>
          {state.course && (
            <PageLayout.Description>
              {t('course.category', { category: state.course.category })}
            </PageLayout.Description>
          )}
        </PageLayout.Heading>
      </PageLayout.Header>
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
          icon="i-ph:books"
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
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('groups.title')}</h2>
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
                  <CourseGroupRow key={group.id} group={group} category={state.course?.category} />
                ))}
              </div>
            )}
          </section>

          {/* No API integration: rename, category change, and deletion only update local state.
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('admin.courses.detail.manage')}</h2>
            <div className={styles.actions}>
              <Link
                to="/admin/courses/$courseId/rename"
                params={{ courseId: state.courseId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="rename">
                  <span className="i-ph:pencil-simple" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.courses.detail.rename')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.courses.detail.rename-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>
              <Link
                to="/admin/courses/$courseId/category"
                params={{ courseId: state.courseId }}
                className={styles.action}
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="category">
                  <span className="i-ph:shapes" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>
                    {t('admin.courses.category.action')}
                  </span>
                  <span className={styles['action-description']}>
                    {t('admin.courses.detail.change-category-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>
              <Link
                to="/admin/courses/$courseId/delete"
                params={{ courseId: state.courseId }}
                className={styles.action}
                data-tone="error"
              >
                <span aria-hidden="true" className={styles['action-icon']} data-icon="delete">
                  <span className="i-ph:trash" />
                </span>
                <span className={styles['action-copy']}>
                  <span className={styles['action-title']}>{t('admin.courses.delete.action')}</span>
                  <span className={styles['action-description']}>
                    {t('admin.courses.detail.delete-description')}
                  </span>
                </span>
                <span aria-hidden="true" className="i-ph:caret-right" />
              </Link>
            </div>
          </section>
          */}
        </>
      )}
    </PageLayout.Root>
  )
}
