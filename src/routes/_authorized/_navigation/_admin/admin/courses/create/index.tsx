import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import { Button, Field, FieldError, FieldLabel, IconButton, Input } from '#/components/ui'

import {
  CourseCategoryChips,
  CourseForm,
  CoursePageLayout,
  CourseRequestError,
  ResultPanel,
} from '../-components'
import { CourseCategoryFilter } from '../-constants'
import { useCreateCoursePage } from '../-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/courses/create/')({
  head: () => ({ meta: [{ title: 'Новий курс | Robocoins' }] }),
  component: CreateCoursePage,
})

function CreateCoursePage() {
  const { state, functions, features } = useCreateCoursePage()

  const t = useTranslate()

  return (
    <CoursePageLayout
      title={t('admin.courses.create.title')}
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
      {state.createdCourse && (
        <ResultPanel
          tone="success"
          title={t('admin.courses.create.success-title')}
          description={t('admin.courses.create.success-description', {
            course: state.createdCourse.name,
          })}
          details={[
            {
              label: t('admin.courses.form.category-label'),
              value: t('course.category', { category: state.createdCourse.category }),
            },
          ]}
        >
          <div className={styles.actions}>
            <Button
              nativeButton={false}
              render={
                <Link to="/admin/courses/$courseId" params={{ courseId: state.createdCourse.id }} />
              }
            >
              {t('admin.courses.open')}
            </Button>
            <Button variant="ghost" onClick={functions.handleCreateAnother}>
              {t('admin.courses.create.another')}
            </Button>
          </div>
        </ResultPanel>
      )}

      {!state.createdCourse && (
        <CourseForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.courses.create.submit')}
          isSubmitting={state.isSubmitting}
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
              </Field>
            )}
          </features.form.Field>

          <features.form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="course-create-name">
                  {t('admin.courses.form.name-label')}
                </FieldLabel>
                <Input
                  id="course-create-name"
                  name={field.name}
                  value={field.state.value}
                  placeholder={t('admin.courses.form.name-placeholder')}
                  autoComplete="off"
                  disabled={state.isSubmitting}
                  aria-invalid={!!field.state.meta.errors.length}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
                {!!field.state.meta.errors.length && (
                  <FieldError>{t('admin.courses.form.name-error')}</FieldError>
                )}
              </Field>
            )}
          </features.form.Field>

          {state.errorKey && <CourseRequestError messageKey={state.errorKey} />}
        </CourseForm>
      )}
    </CoursePageLayout>
  )
}
