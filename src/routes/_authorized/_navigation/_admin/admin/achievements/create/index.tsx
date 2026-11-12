import { useTranslate } from '@kanjou/react'
import { Link, createFileRoute } from '@tanstack/react-router'

import { Button, IconButton, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { PageLayout } from '#/routes/-components/page-layout'
import { AchievementArtwork } from '#/routes/_authorized/-components/achievements'

import { AchievementFields } from '../-components'
import { useCreateAchievementPage } from '../-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/achievements/create/')({
  head: () => ({ meta: [{ title: 'Нове досягнення | Robocoins' }] }),
  component: CreateAchievementPage,
})

function CreateAchievementPage() {
  const { state, mutations, functions } = useCreateAchievementPage()

  const t = useTranslate()

  return (
    <PageLayout.Root bottomSpace className={styles.page}>
      {!state.createdAchievement && (
        <>
          <PageLayout.Header align="end">
            <IconButton
              nativeButton={false}
              render={<Link to="/admin/achievements" />}
              title={t('admin.achievements.title')}
            >
              <span aria-hidden="true" className="i-ph:arrow-left" />
            </IconButton>
            <PageLayout.Heading>
              <PageLayout.Title>{t('admin.achievements.create.title')}</PageLayout.Title>
            </PageLayout.Heading>
          </PageLayout.Header>

          <form className={styles.form} noValidate onSubmit={functions.handleSubmit}>
            <AchievementFields
              draft={state.draft}
              errors={state.errors}
              previewCoins={state.previewCoins}
              disabled={mutations.create.isPending}
              onChange={functions.handleDraftChange}
            />

            {mutations.create.isError && (
              <InlineError onRetry={functions.handleRetry} isRetrying={mutations.create.isPending}>
                {t(state.errorKey ?? 'admin.achievements.create.error')}
              </InlineError>
            )}

            <Button type="submit" className={styles.submit} disabled={mutations.create.isPending}>
              {mutations.create.isPending && <Loader />}
              {!mutations.create.isPending && t('admin.achievements.create.submit')}
            </Button>
          </form>
        </>
      )}

      {state.createdAchievement && (
        <section className={styles.success} role="status">
          <AchievementArtwork requiredCoins={state.createdAchievement.required_coins} size="lg" />
          <PageLayout.Heading>
            <PageLayout.Title>{t('admin.achievements.create.success.title')}</PageLayout.Title>
            <PageLayout.Description>
              {t('admin.achievements.create.success.description')}
            </PageLayout.Description>
          </PageLayout.Heading>

          <dl className={styles.summary}>
            <div className={styles['summary-row']}>
              <dt>{t('admin.achievements.form.name')}</dt>
              <dd>{state.createdAchievement.name}</dd>
            </div>
            {state.createdAchievement.required_coins !== null && (
              <div className={styles['summary-row']}>
                <dt>{t('admin.achievements.form.required')}</dt>
                <dd>
                  {t('achievements.required', {
                    count: state.createdAchievement.required_coins,
                  })}
                </dd>
              </div>
            )}
            <div className={styles['summary-row']}>
              <dt>{t('admin.achievements.form.type')}</dt>
              <dd>{t(`admin.achievements.form.type.${state.createdAchievement.type}`)}</dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <Button nativeButton={false} render={<Link to="/admin/achievements" />}>
              {t('admin.achievements.create.success.open')}
            </Button>
            <Button variant="ghost" type="button" onClick={functions.handleCreateAnother}>
              {t('admin.achievements.create.success.another')}
            </Button>
          </div>
        </section>
      )}
    </PageLayout.Root>
  )
}
