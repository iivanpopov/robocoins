import { useTranslate } from '@kanjou/react'
import { createFileRoute, Link } from '@tanstack/react-router'

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
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { PageLayout } from '#/routes/-components/page-layout'
import { AchievementArtwork } from '#/routes/_authorized/-components/achievements'

import { useDeleteAchievementPage } from '../../-hooks'
import { parseAchievementIdParams } from '../../-utils'

import styles from './index.module.css'

export const Route = createFileRoute(
  '/_authorized/_navigation/_admin/admin/achievements/$achievementId/delete/',
)({
  head: () => ({ meta: [{ title: 'Видалення досягнення | Robocoins' }] }),
  params: { parse: (params) => parseAchievementIdParams(params) },
  component: DeleteAchievementPage,
})

function DeleteAchievementPage() {
  const { state, mutations, functions } = useDeleteAchievementPage()

  const t = useTranslate()

  return (
    <PageLayout.Root bottomSpace className={styles.page}>
      <PageLayout.Header align="end">
        <IconButton
          nativeButton={false}
          render={<Link to="/admin/achievements" />}
          title={t('admin.achievements.title')}
        >
          <span aria-hidden="true" className="i-ph:arrow-left" />
        </IconButton>
        <PageLayout.Heading>
          <PageLayout.Title>{t('admin.achievements.delete.title')}</PageLayout.Title>
        </PageLayout.Heading>
      </PageLayout.Header>

      {state.isPending && <Loader grow />}

      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isFetching}>
          {t(state.errorKey ?? 'admin.achievements.error.load')}
        </InlineError>
      )}

      {state.isNotFound && (
        <p className={styles.notice}>{t('admin.achievements.error.not-found')}</p>
      )}

      {state.achievement && !mutations.delete.isSuccess && (
        <section className={styles.section}>
          <div className={styles.achievement}>
            <AchievementArtwork requiredCoins={state.achievement.required_coins} size="lg" />
            <div className={styles.body}>
              <h2 className={styles.name}>{state.achievement.name}</h2>
              <p className={styles.description}>{state.achievement.description}</p>
              {state.achievement.required_coins !== null && (
                <p className={styles.threshold}>
                  {t('achievements.required', { count: state.achievement.required_coins })}
                </p>
              )}
            </div>
          </div>

          {mutations.delete.isError && (
            <InlineError
              onRetry={functions.handleConfirmDelete}
              isRetrying={mutations.delete.isPending}
            >
              {t(state.deleteErrorKey ?? 'admin.achievements.delete.error')}
            </InlineError>
          )}

          <Button
            className={styles.danger}
            disabled={mutations.delete.isPending}
            onClick={() => functions.handleDialogOpenChange(true)}
          >
            {mutations.delete.isPending && <Loader />}
            {!mutations.delete.isPending && <span aria-hidden="true" className="i-ph:trash" />}
            {!mutations.delete.isPending && t('admin.achievements.delete.action')}
          </Button>
        </section>
      )}

      {mutations.delete.isSuccess && state.deletedAchievement && (
        <section className={styles.section} role="status">
          <span aria-hidden="true" className={styles['success-icon']}>
            <span className="i-ph:check-circle" />
          </span>
          <PageLayout.Heading>
            <PageLayout.Title>{t('admin.achievements.delete.result.title')}</PageLayout.Title>
            <PageLayout.Description>
              {t('admin.achievements.delete.result.description')}
            </PageLayout.Description>
          </PageLayout.Heading>
          <p className={styles['deleted-name']}>{state.deletedAchievement.name}</p>
          <div className={styles.actions}>
            <Button nativeButton={false} render={<Link to="/admin/achievements" />}>
              {t('admin.achievements.create.success.open')}
            </Button>
          </div>
        </section>
      )}

      {state.achievement && (
        <AlertDialog open={state.isDialogOpen} onOpenChange={functions.handleDialogOpenChange}>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>{t('admin.achievements.delete.confirm.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('admin.achievements.delete.confirm.description', {
                  name: state.achievement.name,
                })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
              <AlertDialogAction
                disabled={mutations.delete.isPending}
                onClick={functions.handleConfirmDelete}
              >
                {t('action.confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </PageLayout.Root>
  )
}
