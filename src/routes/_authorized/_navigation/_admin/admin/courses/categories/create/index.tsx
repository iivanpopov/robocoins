import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  IconButton,
  Input,
} from '#/components/ui'

import { CourseForm, CoursePageLayout, ResultPanel } from '../../-components'
import { useCategoryCreatePage } from '../../-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/courses/categories/create/',
)({
  head: () => ({ meta: [{ title: 'Нова категорія | Robocoins' }] }),
  component: CategoryCreatePage,
})

function CategoryCreatePage() {
  const { state, functions, features } = useCategoryCreatePage()

  const t = useTranslate()

  return (
    <CoursePageLayout
      title={t('admin.courses.categories.create.title')}
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
      {state.createdName && (
        <ResultPanel
          tone="local"
          title={t('admin.courses.categories.create.result-title')}
          description={t('admin.courses.categories.create.result-description')}
          details={[
            {
              label: t('admin.courses.categories.create.result-name'),
              value: state.createdName,
            },
          ]}
        >
          <div className={styles.actions}>
            <Button variant="ghost" onClick={functions.handleCreateAnother}>
              {t('admin.courses.categories.create.another')}
            </Button>
            <Button nativeButton={false} render={<Link to="/admin/courses/categories" />}>
              {t('admin.courses.categories.back')}
            </Button>
          </div>
        </ResultPanel>
      )}

      {!state.createdName && (
        <CourseForm
          onSubmit={functions.handleSubmit}
          submitLabel={t('admin.courses.categories.create.submit')}
        >
          <features.form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="category-create-name">
                  {t('admin.courses.categories.name-label')}
                </FieldLabel>
                <Input
                  id="category-create-name"
                  name={field.name}
                  value={field.state.value}
                  placeholder={t('admin.courses.categories.name-placeholder')}
                  autoComplete="off"
                  aria-invalid={!!field.state.meta.errors.length}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
                <FieldDescription>
                  {t('admin.courses.categories.create.description')}
                </FieldDescription>
                {!!field.state.meta.errors.length && (
                  <FieldError>{t('admin.courses.categories.name-error')}</FieldError>
                )}
              </Field>
            )}
          </features.form.Field>
        </CourseForm>
      )}
    </CoursePageLayout>
  )
}
