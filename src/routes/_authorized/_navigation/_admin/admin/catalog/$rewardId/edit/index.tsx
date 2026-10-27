import { useTranslate } from '@kanjou/react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { Button, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { RewardActionNotice, RewardFields, RewardImagePicker } from '../../-components'
import { RewardParamsSchema } from '../../-schemas'
import { useRewardEditPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/catalog/$rewardId/edit/',
)({
  head: () => ({ meta: [{ title: 'Редагування нагороди | Robocoins' }] }),
  params: {
    parse: (params) => {
      const result = v.safeParse(RewardParamsSchema, params)
      if (!result.success) throw notFound()
      return result.output
    },
  },
  component: RewardEditPage,
})

function RewardEditPage() {
  const params = Route.useParams()

  return <RewardEditContent key={params.rewardId} />
}

function RewardEditContent() {
  const { state, functions, features } = useRewardEditPage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <button type="button" className={styles.back} onClick={functions.handleBack}>
        <span className="i-ph:caret-left-bold" aria-hidden="true" />
        {t('admin.catalog.edit.back')}
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
            <h1 className={styles.title}>{t('admin.catalog.edit.title')}</h1>
            <p className={styles.description}>{t('admin.catalog.edit.description')}</p>
          </header>

          <form className={styles.form} noValidate onSubmit={functions.handleSubmit}>
            <RewardFields
              draft={state.draft}
              errors={state.errors}
              onChange={functions.handleDraftChange}
            />
            <RewardImagePicker picker={features.imagePicker} />

            {state.isNoticeVisible && (
              <RewardActionNotice
                title={t('admin.catalog.edit.notice.title')}
                description={t('admin.catalog.edit.notice.description')}
              />
            )}

            <div className={styles.actions}>
              <Button type="submit" disabled={!state.canSubmit}>
                {t('admin.catalog.edit.submit')}
              </Button>
              <button
                type="button"
                className={styles.reset}
                disabled={!state.canSubmit}
                onClick={functions.handleReset}
              >
                {t('admin.catalog.edit.reset')}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  )
}
