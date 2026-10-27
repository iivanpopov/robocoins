import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
// import { cn } from 'cn'
import * as v from 'valibot'

/*
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#/components/ui'
*/
import { IconButton, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { AdminPageLayout } from '#/routes/_authorized/_navigation/_admin/admin/-components'

import { RewardCategoryName } from '../-components'
// import { RewardActionNotice } from '../-components'
import { RewardParamsSchema } from '../-schemas'
import { useRewardDetailPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/catalog/$rewardId/')({
  head: () => ({ meta: [{ title: 'Нагорода | Robocoins' }] }),
  params: {
    parse: (params) => {
      const result = v.safeParse(RewardParamsSchema, params)
      if (!result.success) throw notFound()
      return result.output
    },
  },
  component: RewardDetailPage,
})

function RewardDetailPage() {
  const params = Route.useParams()

  return <RewardDetailContent key={params.rewardId} />
}

function RewardDetailContent() {
  const { state, functions } = useRewardDetailPage()

  const t = useTranslate()

  return (
    <AdminPageLayout.Root bottomSpace className={styles.page}>
      <AdminPageLayout.Header align="end">
        <IconButton
          onClick={functions.handleBack}
          title={t('navigation.catalog')}
          aria-label={t('navigation.catalog')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <AdminPageLayout.Heading>
          <AdminPageLayout.Title className={styles.title}>
            {state.reward?.name ?? t('admin.catalog.details.title')}
          </AdminPageLayout.Title>
          {!!state.reward && (
            <p className={styles.meta}>
              <span>{t(`admin.catalog.type.${state.reward.type}`)},</span>
              <RewardCategoryName category={state.reward.course_category} />
            </p>
          )}
          {!!state.reward && (
            <p className={styles.price}>
              {t('coins.amount', { count: state.reward.price })}
              <span className="i-ph:coins-bold" aria-hidden="true" />
            </p>
          )}
        </AdminPageLayout.Heading>
      </AdminPageLayout.Header>

      {state.isPending && <Loader grow />}

      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isFetching}>
          {t(state.errorKey ?? 'admin.catalog.error.load')}
        </InlineError>
      )}

      {!!state.reward && (
        <>
          {!!state.reward.description?.trim() && (
            <section className={styles.section}>
              <h2 className={styles['section-title']}>{t('field.description.label')}</h2>
              <p className={styles.description}>{state.reward.description}</p>
            </section>
          )}

          {/* No API integration: editing, visibility changes, and deletion only update local state.
          <section className={styles.section}>
            <h2 className={styles['section-title']}>{t('admin.catalog.details.manage')}</h2>
            <div className={styles.actions}>
              <button type="button" className={styles.action} onClick={functions.handleEdit}>
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:pencil-simple-duotone" />
                </span>
                <span className={styles['action-title']}>{t('admin.catalog.details.edit')}</span>
                <span aria-hidden="true" className={cn('i-ph:caret-right-bold', styles.caret)} />
              </button>
              <button type="button" className={styles.action} onClick={functions.handleOpenHide}>
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:eye-slash-duotone" />
                </span>
                <span className={styles['action-title']}>{t('admin.catalog.details.hide')}</span>
              </button>
              <button type="button" className={styles.action} onClick={functions.handleOpenShow}>
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:eye-duotone" />
                </span>
                <span className={styles['action-title']}>{t('admin.catalog.details.show')}</span>
              </button>
              <button
                type="button"
                className={styles.action}
                data-tone="error"
                onClick={functions.handleOpenDelete}
              >
                <span aria-hidden="true" className={styles['action-icon']}>
                  <span className="i-ph:trash-duotone" />
                </span>
                <span className={styles['action-title']}>{t('admin.catalog.details.delete')}</span>
              </button>
            </div>

            {state.notice === 'hide' && (
              <RewardActionNotice
                title={t('admin.catalog.availability.result-title')}
                description={t('admin.catalog.details.hide.result.description')}
                onDismiss={functions.handleDismissNotice}
              />
            )}
            {state.notice === 'show' && (
              <RewardActionNotice
                title={t('admin.catalog.availability.result-title')}
                description={t('admin.catalog.details.show.result.description')}
                onDismiss={functions.handleDismissNotice}
              />
            )}
            {state.notice === 'delete' && (
              <RewardActionNotice
                title={t('admin.catalog.details.delete.result.title')}
                description={t('admin.catalog.details.delete.result.description')}
                onDismiss={functions.handleDismissNotice}
              />
            )}
          </section>
          */}
        </>
      )}

      {/* No API integration: these confirmations only update local state.
      <AlertDialog open={state.isHideOpen} onOpenChange={functions.handleHideOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.catalog.details.hide.confirm.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.catalog.details.hide.confirm.description', {
                name: state.reward?.name ?? '',
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={functions.handleConfirmHide}>
              {t('admin.catalog.details.hide.confirm.action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={state.isShowOpen} onOpenChange={functions.handleShowOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.catalog.details.show.confirm.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.catalog.details.show.confirm.description', {
                name: state.reward?.name ?? '',
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={functions.handleConfirmShow}>
              {t('action.show')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={state.isDeleteOpen} onOpenChange={functions.handleDeleteOpenChange}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.catalog.details.delete.confirm.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.catalog.details.delete.confirm.description', {
                name: state.reward?.name ?? '',
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={functions.handleConfirmDelete}>
              {t('action.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      */}
    </AdminPageLayout.Root>
  )
}
