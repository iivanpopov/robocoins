import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, IconButton, Loader } from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'

import { CoursePageLayout, CourseRequestError } from '../-components'
import { useCourseCategoriesPage } from '../-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/courses/categories/')({
  head: () => ({ meta: [{ title: 'Категорії курсів | Robocoins' }] }),
  component: CourseCategoriesPage,
})

function CourseCategoriesPage() {
  const { state, functions } = useCourseCategoriesPage()

  const t = useTranslate()

  return (
    <CoursePageLayout
      title={t('admin.courses.categories.title')}
      description={t('admin.courses.categories.description')}
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/courses" />}
          title={t('admin.courses.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
      actions={
        <Button nativeButton={false} render={<Link to="/admin/courses/categories/create" />}>
          <span aria-hidden="true" className="i-ph:plus-bold" />
          {t('admin.courses.categories.create')}
        </Button>
      }
    >
      {state.isPending && <Loader grow />}
      {state.isError && state.errorKey && (
        <CourseRequestError
          messageKey={state.errorKey}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
        />
      )}

      {!state.isPending && !state.isError && (
        <>
          <p className={styles.note}>
            <span aria-hidden="true" className="i-ph:lock-simple-duotone" />
            <span>{t('admin.courses.categories.fixed')}</span>
          </p>

          <div className={styles.summary}>
            <span>{t('admin.courses.courses-count', { count: state.totalCourses })}</span>
            <span>{t('admin.courses.groups-count', { count: state.totalGroups })}</span>
          </div>

          <div className={styles.categories}>
            {state.summaries.map((summary) => (
              <details
                key={summary.category}
                className={styles.category}
                data-category={summary.category}
              >
                <summary className={styles['category-summary']}>
                  <span className={styles.icon}>
                    <CategoryIcon category={summary.category} />
                  </span>
                  <span className={styles.copy}>
                    <span className={styles.name}>
                      {t('course.category', { category: summary.category })}
                    </span>
                    <span className={styles.counts}>
                      <span>
                        {t('admin.courses.courses-count', { count: summary.courses.length })}
                      </span>
                      <span>{t('admin.courses.groups-count', { count: summary.groupsCount })}</span>
                    </span>
                  </span>
                  <span aria-hidden="true" className={styles.caret} />
                </summary>
                <div className={styles.body}>
                  <div className={styles['category-actions']}>
                    <Link
                      to="/admin/courses/categories/$category/rename"
                      params={{ category: summary.category }}
                      className={styles['category-action']}
                      aria-label={t('admin.courses.categories.rename-label', {
                        category: t('course.category', { category: summary.category }),
                      })}
                    >
                      <span aria-hidden="true" className="i-ph:pencil-simple-duotone" />
                      {t('admin.courses.categories.rename-action')}
                    </Link>
                    <Link
                      to="/admin/courses/categories/$category/delete"
                      params={{ category: summary.category }}
                      className={styles['category-action']}
                      data-tone="error"
                      aria-label={t('admin.courses.categories.delete-label', {
                        category: t('course.category', { category: summary.category }),
                      })}
                    >
                      <span aria-hidden="true" className="i-ph:trash-duotone" />
                      {t('admin.courses.categories.delete-action')}
                    </Link>
                  </div>
                  {!summary.courses.length && (
                    <p className={styles.empty}>{t('admin.courses.categories.empty')}</p>
                  )}
                  {!!summary.courses.length && (
                    <ul className={styles.courses}>
                      {summary.courses.map((course) => (
                        <li key={course.id} className={styles.course}>
                          <Link
                            to="/admin/courses/$courseId"
                            params={{ courseId: course.id }}
                            className={styles['course-link']}
                          >
                            <span className={styles['course-name']}>{course.name}</span>
                            <span className={styles['course-meta']}>
                              {t('admin.courses.groups-count', {
                                count: course.groups_count ?? course.groups?.length ?? 0,
                              })}
                            </span>
                          </Link>
                          <Link
                            to="/admin/courses/$courseId/category"
                            params={{ courseId: course.id }}
                            className={styles['change-link']}
                            aria-label={t('admin.courses.categories.change', {
                              course: course.name,
                            })}
                          >
                            <span aria-hidden="true" className="i-ph:arrows-left-right-bold" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            ))}
          </div>
        </>
      )}
    </CoursePageLayout>
  )
}
