import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams, useSearch } from '@tanstack/react-router'
import * as v from 'valibot'

import { Button, Field, FieldDescription, FieldLabel, IconButton, Loader } from '#/components/ui'

import {
  CourseCategoryChips,
  CourseEmptyState,
  CourseForm,
  CoursePageLayout,
  CourseRequestError,
  ResultPanel,
} from '../../-components'
import { CourseCategoryFilter } from '../../-constants'
import { useCourseCategoryPage } from '../../-hooks'
import { parseCourseIdParams } from '../../-utils'

import styles from './index.module.css'

const CourseCategorySearchSchema = v.object({
  from: v.optional(v.picklist(['categories'])),
})

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/courses/$courseId/category/',
)({
  head: () => ({ meta: [{ title: 'Категорія курсу | Robocoins' }] }),
  params: { parse: (params) => parseCourseIdParams(params) },
  validateSearch: CourseCategorySearchSchema,
  component: CourseCategoryRoute,
})

function CourseCategoryRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/category/',
  })

  return <CourseCategoryPage key={params.courseId} />
}

function CourseCategoryPage() {
  const { state, functions, features } = useCourseCategoryPage()

  const search = useSearch({
    from: '/_authorized/_navigation/_admin/admin/courses/$courseId/category/',
  })

  const t = useTranslate()

  const backToCategories = search.from === 'categories'

  let backButton = (
    <IconButton
      nativeButton={false}
      render={<Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />}
      title={t('admin.courses.back-to-course')}
    >
      <span aria-hidden="true" className="i-ph:arrow-left" />
    </IconButton>
  )

  if (backToCategories) {
    backButton = (
      <IconButton
        nativeButton={false}
        render={<Link to="/admin/courses/categories" />}
        title={t('admin.courses.categories.back')}
      >
        <span aria-hidden="true" className="i-ph:arrow-left" />
      </IconButton>
    )
  }

  return (
    <CoursePageLayout
      title={t('admin.courses.category.title')}
      description={
        <>
          {!state.course && t('admin.courses.category.description-empty')}
          {state.course && <>{state.course.name}</>}
        </>
      }
      back={backButton}
    >
      {state.isPending && <Loader grow />}
      {state.isError && state.errorKey && (
        <CourseRequestError
          messageKey={state.errorKey}
          onRetry={functions.handleRetry}
          isRetrying={state.isFetching}
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

      {state.course && state.selectedCategory === null && (
        <CourseForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.courses.category.submit')}
          submitDisabled={state.isUnchanged}
        >
          <features.form.Field name="category">
            {(field) => (
              <Field>
                <FieldLabel>{t('admin.courses.form.category-label')}</FieldLabel>
                <CourseCategoryChips
                  value={field.state.value}
                  onSelect={(category) => {
                    if (category === CourseCategoryFilter.All) return
                    field.handleChange(category)
                  }}
                />
                {state.isUnchanged && (
                  <FieldDescription>{t('admin.courses.category.same')}</FieldDescription>
                )}
              </Field>
            )}
          </features.form.Field>
        </CourseForm>
      )}

      {state.course && state.selectedCategory !== null && (
        <ResultPanel
          tone="local"
          title={t('admin.courses.category.result-title')}
          description={t('admin.courses.category.result-description')}
          details={[
            {
              label: t('admin.courses.category.current'),
              value: t('course.category', { category: state.course.category }),
            },
            {
              label: t('admin.courses.category.proposed'),
              value: t('course.category', { category: state.selectedCategory }),
            },
          ]}
        >
          <div className={styles.actions}>
            {!backToCategories && (
              <Button
                nativeButton={false}
                render={
                  <Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />
                }
              >
                {t('admin.courses.back-to-course')}
              </Button>
            )}
            {backToCategories && (
              <Button nativeButton={false} render={<Link to="/admin/courses/categories" />}>
                {t('admin.courses.categories.back')}
              </Button>
            )}
            <Button variant="ghost" nativeButton={false} render={<Link to="/admin/courses" />}>
              {t('admin.courses.back')}
            </Button>
          </div>
        </ResultPanel>
      )}
    </CoursePageLayout>
  )
}
