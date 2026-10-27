import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

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

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/courses/$courseId/category/',
)({
  head: () => ({ meta: [{ title: 'Категорія курсу | Robocoins' }] }),
  params: { parse: (params) => parseCourseIdParams(params) },
  component: CourseCategoryPage,
})

function CourseCategoryPage() {
  const { state, functions, features } = useCourseCategoryPage()

  const t = useTranslate()

  let description = t('admin.courses.category.description-empty')

  if (state.course) {
    description = t('admin.courses.category.description', { course: state.course.name })
  }

  return (
    <CoursePageLayout
      title={t('admin.courses.category.title')}
      description={description}
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />}
          title={t('admin.courses.back-to-course')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
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
          note={t('admin.courses.category.note')}
          cancel={
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />}
            >
              {t('action.cancel')}
            </Button>
          }
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
            <Button
              nativeButton={false}
              render={<Link to="/admin/courses/$courseId" params={{ courseId: state.courseId }} />}
            >
              {t('admin.courses.back-to-course')}
            </Button>
            <Button variant="ghost" nativeButton={false} render={<Link to="/admin/courses" />}>
              {t('admin.courses.back')}
            </Button>
          </div>
        </ResultPanel>
      )}
    </CoursePageLayout>
  )
}
