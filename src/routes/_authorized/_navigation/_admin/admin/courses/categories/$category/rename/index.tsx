import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

import { Button, Field, FieldError, FieldLabel, IconButton, Input } from '#/components/ui'

import { CourseForm, CoursePageLayout, ResultPanel } from '../../../-components'
import { useCategoryRenamePage } from '../../../-hooks'
import { parseCategoryKeyParams } from '../../../-utils'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/courses/categories/$category/rename/',
)({
  head: () => ({ meta: [{ title: 'Перейменування категорії | Robocoins' }] }),
  params: { parse: (params) => parseCategoryKeyParams(params) },
  component: CategoryRenameRoute,
})

function CategoryRenameRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/categories/$category/rename/',
  })

  return <CategoryRenamePage key={params.category} />
}

function CategoryRenamePage() {
  const { state, functions, features } = useCategoryRenamePage()

  const t = useTranslate()
  const categoryLabel = t('course.category', { category: state.category })

  return (
    <CoursePageLayout
      title={t('admin.courses.categories.rename.title')}
      description={t('admin.courses.categories.rename.description', {
        category: categoryLabel,
      })}
      back={
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/courses/categories" />}
          title={t('admin.courses.categories.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
      }
    >
      {!state.renamedName && (
        <CourseForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.courses.categories.rename.submit')}
          cancel={
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link to="/admin/courses/categories" />}
            >
              {t('action.cancel')}
            </Button>
          }
        >
          <features.form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="category-rename-name">
                  {t('admin.courses.categories.name-label')}
                </FieldLabel>
                <Input
                  id="category-rename-name"
                  name={field.name}
                  value={field.state.value}
                  placeholder={categoryLabel}
                  autoComplete="off"
                  aria-invalid={!!field.state.meta.errors.length}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
                {!!field.state.meta.errors.length && (
                  <FieldError>{t('admin.courses.categories.name-error')}</FieldError>
                )}
              </Field>
            )}
          </features.form.Field>
        </CourseForm>
      )}

      {!!state.renamedName && (
        <ResultPanel
          tone="local"
          title={t('admin.courses.categories.rename.result-title')}
          description={t('admin.courses.categories.rename.result-description')}
          details={[
            {
              label: t('admin.courses.categories.rename.current'),
              value: categoryLabel,
            },
            {
              label: t('admin.courses.categories.rename.proposed'),
              value: state.renamedName,
            },
          ]}
        >
          <div className={styles.actions}>
            <Button nativeButton={false} render={<Link to="/admin/courses/categories" />}>
              {t('admin.courses.categories.back')}
            </Button>
          </div>
        </ResultPanel>
      )}
    </CoursePageLayout>
  )
}
