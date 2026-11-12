import { useTranslate } from '@kanjou/react'
import { Link, createFileRoute } from '@tanstack/react-router'

import { Button, Loader } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { PageLayout } from '#/routes/-components/page-layout'

import { AchievementRow } from './-components'
import { useAdminAchievementsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/_admin/admin/achievements/')({
  head: () => ({ meta: [{ title: 'Досягнення | Robocoins' }] }),
  component: AdminAchievementsPage,
})

function AdminAchievementsPage() {
  const { state, functions } = useAdminAchievementsPage()

  const t = useTranslate()

  return (
    <PageLayout.Root className={styles.page}>
      <PageLayout.Header centered>
        <PageLayout.Heading>
          <PageLayout.Title>{t('admin.achievements.title')}</PageLayout.Title>
        </PageLayout.Heading>
        <PageLayout.Actions>
          <Button nativeButton={false} render={<Link to="/admin/achievements/create" />}>
            <span className="i-ph:plus" aria-hidden="true" />
            {t('admin.achievements.add')}
          </Button>
        </PageLayout.Actions>
      </PageLayout.Header>

      {state.isPending && <Loader grow />}

      {state.isError && (
        <InlineError onRetry={functions.handleRetry} isRetrying={state.isFetching}>
          {t(state.errorKey ?? 'admin.achievements.error.load')}
        </InlineError>
      )}

      {!state.isPending && !state.isError && !state.achievements.length && (
        <div className={styles.empty}>
          <span className="i-ph:medal" aria-hidden="true" />
          <p>{t('admin.achievements.empty')}</p>
          <Button nativeButton={false} render={<Link to="/admin/achievements/create" />}>
            {t('admin.achievements.add')}
          </Button>
        </div>
      )}

      {!state.isPending && !state.isError && !!state.achievements.length && (
        <ul className={styles.list}>
          {state.achievements.map((achievement) => (
            <li key={achievement.id}>
              <AchievementRow achievement={achievement} />
            </li>
          ))}
        </ul>
      )}
    </PageLayout.Root>
  )
}
