import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, Loader } from '#/components/ui'
import { CategoryIcon } from '#/routes/-components'

import { CoursePageLayout, CourseRequestError } from '../-components'
import { useCourseCategoriesPage } from '../-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/courses/categories/')({
  head: () => ({ meta: [{ title: 'Категорії | Robocoins' }] }),
  component: CourseCategoriesPage,
})

function CourseCategoriesPage() {
  const { state, functions } = useCourseCategoriesPage()

  const t = useTranslate()

  return (
    <CoursePageLayout
      title={t('admin.courses.categories.title')}
      headingAction={
        <Button nativeButton={false} render={<Link to="/admin/courses/categories/create" />}>
          <span aria-hidden="true" className="i-ph:plus-bold" />
          {t('admin.learning.create')}
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
                          </Link>
                          <Link
                            to="/admin/courses/$courseId/category"
                            params={{ courseId: course.id }}
                            search={{ from: 'categories' }}
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
