import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

import { Button, Field, FieldError, FieldLabel, IconButton, Input } from '#/components/ui'
import { PageLayout } from '#/routes/-components/page-layout'

import { CourseForm, ResultPanel } from '../../../-components'
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
    <PageLayout.Root>
      <PageLayout.Header align="end">
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/courses/categories" />}
          title={t('admin.courses.categories.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('admin.courses.categories.rename.title')}</PageLayout.Title>
          <PageLayout.Description>
            {t('admin.courses.categories.rename.description', { category: categoryLabel })}
          </PageLayout.Description>
        </PageLayout.Heading>
      </PageLayout.Header>
      {!state.renamedName && (
        <CourseForm onSubmit={functions.handleSubmit} submitLabel={t('action.rename')}>
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
          title={t('admin.shared.local-result')}
          description={t('admin.courses.categories.rename.result-description')}
          details={[
            {
              label: t('field.current-name'),
              value: categoryLabel,
            },
            {
              label: t('field.proposed-name'),
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
    </PageLayout.Root>
  )
}
