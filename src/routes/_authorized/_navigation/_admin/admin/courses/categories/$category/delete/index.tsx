import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  IconButton,
} from '#/components/ui'

import { CoursePageLayout, ResultPanel } from '../../../-components'
import { useCategoryDeletePage } from '../../../-hooks'
import { parseCategoryKeyParams } from '../../../-utils'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/courses/categories/$category/delete/',
)({
  head: () => ({ meta: [{ title: 'Видалення категорії | Robocoins' }] }),
  params: { parse: (params) => parseCategoryKeyParams(params) },
  component: CategoryDeleteRoute,
})

function CategoryDeleteRoute() {
  const params = useParams({
    from: '/_authorized/_navigation/_admin/admin/courses/categories/$category/delete/',
  })

  return <CategoryDeletePage key={params.category} />
}

function CategoryDeletePage() {
  const { state, functions } = useCategoryDeletePage()

  const t = useTranslate()
  const categoryLabel = t('course.category', { category: state.category })

  return (
    <CoursePageLayout
      title={t('admin.courses.categories.delete.title')}
      description={t('admin.courses.categories.delete.description', {
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
      {!state.isDeletedLocally && (
        <>
          <p className={styles.note}>
            <span aria-hidden="true" className="i-ph:info-duotone" />
            <span>{t('admin.courses.categories.delete.note')}</span>
          </p>
          <p className={styles.warning}>{t('admin.courses.categories.delete.warning')}</p>
          <div className={styles.actions}>
            <Button className={styles.danger} onClick={functions.handleOpenDialog}>
              {t('admin.courses.categories.delete.submit')}
            </Button>
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link to="/admin/courses/categories" />}
            >
              {t('action.cancel')}
            </Button>
          </div>
        </>
      )}

      <AlertDialog open={state.isDialogOpen} onOpenChange={functions.handleDialogOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.courses.categories.delete.dialog-title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.courses.categories.delete.dialog-description', {
                category: categoryLabel,
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={functions.handleConfirmDelete}>
              {t('admin.courses.categories.delete.dialog-action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {state.isDeletedLocally && (
        <ResultPanel
          tone="local"
          title={t('admin.courses.categories.delete.result-title')}
          description={t('admin.courses.categories.delete.result-description')}
          details={[
            {
              label: t('admin.courses.categories.delete.result-category'),
              value: categoryLabel,
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
