import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { RewardActionNotice, RewardCategoryName } from '../-components'
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
  const { state, functions } = useRewardDetailPage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <button type="button" className={styles.back} onClick={functions.handleBack}>
        <span className="i-ph:caret-left-bold" aria-hidden="true" />
        {t('admin.catalog.back')}
      </button>

      {state.isPending && <Loader grow />}

      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isFetching}>
          {t(state.errorKey ?? 'admin.catalog.error.load')}
        </InlineError>
      )}

      {state.reward && (
        <>
          <header className={styles.header}>
            <span className={styles.type}>{t(`admin.catalog.type.${state.reward.type}`)}</span>
            <h1 className={styles.title}>{state.reward.name}</h1>
            <p className={styles.price}>
              {t('shop.reward.price', { count: state.reward.price })}
              <span className="i-ph:coins-bold" aria-hidden="true" />
            </p>
          </header>

          <dl className={styles.summary}>
            <div className={styles['summary-row']}>
              <dt>{t('admin.catalog.details.type')}</dt>
              <dd>{t(`admin.catalog.type.${state.reward.type}`)}</dd>
            </div>
            <div className={styles['summary-row']}>
              <dt>{t('admin.catalog.details.category')}</dt>
              <dd>
                <RewardCategoryName category={state.reward.course_category} />
              </dd>
            </div>
            <div className={styles['summary-row']}>
              <dt>{t('admin.catalog.details.image')}</dt>
              <dd className={styles.muted}>{t('admin.catalog.details.image.none')}</dd>
            </div>
            <div className={styles['summary-description']}>
              <dt>{t('admin.catalog.details.description')}</dt>
              <dd>
                {!!state.reward.description?.trim() && <p>{state.reward.description}</p>}
                {!state.reward.description?.trim() && (
                  <p className={styles.muted}>{t('admin.catalog.details.no-description')}</p>
                )}
              </dd>
            </div>
          </dl>

          <section className={styles.manage}>
            <h2 className={styles['manage-title']}>{t('admin.catalog.details.manage')}</h2>
            <p className={styles['manage-description']}>
              {t('admin.catalog.details.manage.description')}
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.action} onClick={functions.handleEdit}>
                {t('admin.catalog.details.edit')}
              </button>
              <button type="button" className={styles.action} onClick={functions.handleOpenHide}>
                {t('admin.catalog.details.hide')}
              </button>
              <button type="button" className={styles.delete} onClick={functions.handleOpenDelete}>
                {t('admin.catalog.details.delete')}
              </button>
            </div>

            {state.notice === 'hide' && (
              <RewardActionNotice
                title={t('admin.catalog.details.hide.result.title')}
                description={t('admin.catalog.details.hide.result.description')}
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
        </>
      )}

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
              {t('admin.catalog.details.delete.confirm.action')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
