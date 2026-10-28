import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Loader } from '#/components/ui'
// import { Button } from '#/components/ui'
import { LearningCard } from '#/routes/-components'
import { PageLayout } from '#/routes/-components/page-layout'

import { CourseRequestError } from '../-components'
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
    <PageLayout.Root>
      <PageLayout.Header>
        <PageLayout.Heading>
          <PageLayout.Title>{t('categories.title')}</PageLayout.Title>
        </PageLayout.Heading>
        {/* No API integration: category creation only updates local state.
      <PageLayout.Actions>
        <Button nativeButton={false} render={<Link to="/admin/courses/categories/create" />}>
          <span aria-hidden="true" className="i-ph:plus" />
          {t('admin.learning.create')}
        </Button>
      </PageLayout.Actions>
      */}
      </PageLayout.Header>
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
              <LearningCard.Root key={summary.category} render={<details />}>
                <LearningCard.Row render={<summary />}>
                  <LearningCard.Icon category={summary.category} />
                  <LearningCard.Content>
                    <LearningCard.Title>
                      {t('course.category', { category: summary.category })}
                    </LearningCard.Title>
                  </LearningCard.Content>
                  <LearningCard.Indicator kind="expand" />
                </LearningCard.Row>
                <div className={styles.body}>
                  {/* No API integration: category renaming only updates local state.
                  <div className={styles['category-actions']}>
                    <Link
                      to="/admin/courses/categories/$category/rename"
                      params={{ category: summary.category }}
                      className={styles['category-action']}
                      aria-label={t('admin.courses.categories.rename-label', {
                        category: t('course.category', { category: summary.category }),
                      })}
                    >
                      <span aria-hidden="true" className="i-ph:pencil-simple" />
                      {t('action.rename')}
                    </Link>
                  </div>
                  */}
                  {!summary.courses.length && (
                    <p className={styles.empty}>{t('admin.courses.categories.empty')}</p>
                  )}
                  {!!summary.courses.length && (
                    <ul className={styles.courses}>
                      {summary.courses.map((course) => (
                        <li key={course.id} className={styles.course}>
                          <LearningCard.Root>
                            <LearningCard.Row
                              render={
                                <Link
                                  to="/admin/courses/$courseId"
                                  params={{ courseId: course.id }}
                                />
                              }
                            >
                              <LearningCard.Content>
                                <LearningCard.Title>{course.name}</LearningCard.Title>
                              </LearningCard.Content>
                              <LearningCard.Indicator kind="navigate" />
                            </LearningCard.Row>
                          </LearningCard.Root>
                          {/* No API integration: course category changes only update local state.
                          <Link
                            to="/admin/courses/$courseId/category"
                            params={{ courseId: course.id }}
                            search={{ from: 'categories' }}
                            className={styles['change-link']}
                            aria-label={t('admin.courses.categories.change', {
                              course: course.name,
                            })}
                          >
                            <span aria-hidden="true" className="i-ph:arrows-left-right" />
                          </Link>
                          */}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </LearningCard.Root>
            ))}
          </div>
        </>
      )}
    </PageLayout.Root>
  )
}
