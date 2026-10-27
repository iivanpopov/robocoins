import { useTranslate } from '@kanjou/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'

import { Button, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { RewardCategoryName, RewardFields, RewardImagePicker } from '../-components'
import { useCreateRewardPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/catalog/create/')({
  head: () => ({ meta: [{ title: 'Нова нагорода | Robocoins' }] }),
  component: CreateRewardPage,
})

function CreateRewardPage() {
  const { state, mutations, functions, features } = useCreateRewardPage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <Link to="/admin/catalog" className={styles.back}>
        <span className="i-ph:caret-left-bold" aria-hidden="true" />
        {t('admin.catalog.back')}
      </Link>

      {!state.createdReward && (
        <>
          <header className={styles.header}>
            <h1 className={styles.title}>{t('admin.catalog.create.title')}</h1>
            <p className={styles.description}>{t('admin.catalog.create.description')}</p>
          </header>

          <form className={styles.form} noValidate onSubmit={functions.handleSubmit}>
            <RewardFields
              draft={state.draft}
              errors={state.errors}
              disabled={mutations.create.isPending}
              onChange={functions.handleDraftChange}
            />
            <RewardImagePicker
              picker={features.imagePicker}
              disabled={mutations.create.isPending}
            />

            {mutations.create.isError && (
              <InlineError onRetry={functions.handleRetry} isRetrying={mutations.create.isPending}>
                {t(state.errorKey ?? 'admin.catalog.create.error')}
              </InlineError>
            )}

            <Button type="submit" className={styles.submit} disabled={mutations.create.isPending}>
              {mutations.create.isPending && <Loader />}
              {!mutations.create.isPending && t('admin.catalog.form.submit')}
            </Button>
          </form>
        </>
      )}

      {state.createdReward && (
        <section className={styles.success} role="status">
          <span
            className={cn('i-ph:check-circle-duotone', styles['success-icon'])}
            aria-hidden="true"
          />
          <div className={styles['success-heading']}>
            <h1 className={styles.title}>{t('admin.catalog.create.success.title')}</h1>
            <p className={styles.description}>{t('admin.catalog.create.success.description')}</p>
          </div>

          <dl className={styles.summary}>
            <div className={styles['summary-row']}>
              <dt>{t('admin.catalog.form.name')}</dt>
              <dd>{state.createdReward.name}</dd>
            </div>
            <div className={styles['summary-row']}>
              <dt>{t('admin.catalog.form.price')}</dt>
              <dd>
                {t('shop.reward.price', { count: state.createdReward.price })}
                <span className="i-ph:coins-bold" aria-hidden="true" />
              </dd>
            </div>
            <div className={styles['summary-row']}>
              <dt>{t('admin.catalog.form.type')}</dt>
              <dd>{t(`admin.catalog.type.${state.createdReward.type}`)}</dd>
            </div>
            <div className={styles['summary-row']}>
              <dt>{t('admin.catalog.form.category')}</dt>
              <dd>
                <RewardCategoryName category={state.createdReward.course_category} />
              </dd>
            </div>
          </dl>

          {features.imagePicker.state.selection && (
            <div className={styles['image-preview']}>
              <h2 className={styles['preview-title']}>{t('admin.catalog.create.success.image')}</h2>
              <div className={styles['preview-body']}>
                <div className={styles['preview-media']}>
                  {!features.imagePicker.state.isPreviewBroken && (
                    <img
                      src={features.imagePicker.state.selection.url}
                      alt=""
                      onError={features.imagePicker.functions.handlePreviewError}
                    />
                  )}
                  {features.imagePicker.state.isPreviewBroken && (
                    <span className="i-ph:image-broken-duotone" aria-hidden="true" />
                  )}
                </div>
                <p className={styles['preview-description']}>
                  {t('admin.catalog.create.success.image.description')}
                </p>
              </div>
              {features.imagePicker.state.isPreviewBroken && (
                <p className={styles['preview-error']} role="alert">
                  {t('admin.catalog.image.error.preview')}
                </p>
              )}
            </div>
          )}

          {!features.imagePicker.state.selection && (
            <p className={styles['image-empty']}>{t('admin.catalog.create.success.no-image')}</p>
          )}

          <div className={styles.actions}>
            <Link
              to="/admin/catalog/$rewardId"
              params={{ rewardId: state.createdReward.id }}
              className={styles['primary-action']}
            >
              {t('admin.catalog.create.success.open')}
            </Link>
            <button
              type="button"
              className={styles['secondary-action']}
              onClick={functions.handleCreateAnother}
            >
              {t('admin.catalog.create.success.another')}
            </button>
            <Link to="/admin/catalog" className={styles['secondary-action']}>
              {t('admin.catalog.create.success.catalog')}
            </Link>
          </div>
        </section>
      )}
    </section>
  )
}
