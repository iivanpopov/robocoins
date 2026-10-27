import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { cn } from 'cn'
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
  IconButton,
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
  const params = Route.useParams()

  return <RewardDetailContent key={params.rewardId} />
}

function RewardDetailContent() {
  const { state, functions } = useRewardDetailPage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <IconButton
          onClick={functions.handleBack}
          title={t('admin.catalog.back')}
          aria-label={t('admin.catalog.back')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <div className={styles['header-copy']}>
          <h1 className={styles.title}>{state.reward?.name ?? t('admin.catalog.details.title')}</h1>
          {!!state.reward && (
            <p className={styles.meta}>
              <span>{t(`admin.catalog.type.${state.reward.type}`)},</span>
              <RewardCategoryName category={state.reward.course_category} />
            </p>
          )}
          {!!state.reward && (
            <p className={styles.price}>
              {t('shop.reward.price', { count: state.reward.price })}
              <span className="i-ph:coins-bold" aria-hidden="true" />
            </p>
          )}
        </div>
      </header>

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
              <h2 className={styles['section-title']}>{t('admin.catalog.details.description')}</h2>
              <p className={styles.description}>{state.reward.description}</p>
            </section>
          )}

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
                title={t('admin.catalog.details.hide.result.title')}
                description={t('admin.catalog.details.hide.result.description')}
                onDismiss={functions.handleDismissNotice}
              />
            )}
            {state.notice === 'show' && (
              <RewardActionNotice
                title={t('admin.catalog.details.show.result.title')}
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
              {t('admin.catalog.details.show.confirm.action')}
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
