import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  Button,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'

import { useSettingsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/settings/')({
  head: () => ({ meta: [{ title: 'Налаштування | Robocoins' }] }),
  component: SettingsPage,
})

function SettingsPage() {
  const { state, queries, mutations, functions } = useSettingsPage()

  const t = useTranslate()

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{t('navbar.settings')}</h1>
      <dl className={styles.details}>
        <dt className={styles.label}>{t('settings.name')}</dt>
        <dd className={styles.name}>{state.user?.name}</dd>
        {state.isPasswordVisible && queries.credentials.isSuccess && (
          <>
            <dt className={styles.label}>{t('settings.password')}</dt>
            <dd className={styles.name}>{queries.credentials.data.access_code}</dd>
          </>
        )}
      </dl>
      {state.user?.role === 'student' && (
        <>
          {state.isPasswordVisible && queries.credentials.isError && (
            <InlineError
              onRetry={functions.handleRetryCredentials}
              isRetrying={queries.credentials.isFetching}
            >
              {t('settings.credentials.error')}
            </InlineError>
          )}
          <Button variant="ghost" onClick={functions.handleTogglePassword}>
            {state.isPasswordVisible && queries.credentials.isFetching && <Loader />}
            {state.isPasswordVisible && !queries.credentials.isFetching && (
              <div aria-hidden="true" className="i-ph:eye-slash-bold" />
            )}
            {!state.isPasswordVisible && <div aria-hidden="true" className="i-ph:eye-bold" />}
            {state.isPasswordVisible && t('field.password.hide')}
            {!state.isPasswordVisible && t('field.password.show')}
          </Button>
        </>
      )}
      <div>
        <Button
          variant="ghost"
          role="switch"
          aria-checked={state.animationsDisabled}
          aria-describedby="motion-description"
          onClick={functions.handleToggleAnimations}
        >
          <span
            aria-hidden="true"
            className={cn(
              state.animationsDisabled && 'i-ph:check-square-bold',
              !state.animationsDisabled && 'i-ph:square-bold',
            )}
          />
          {t('settings.animations.disable')}
        </Button>
        <p id="motion-description" className={styles.label}>
          {state.systemReducedMotion && t('settings.animations.system')}
          {!state.systemReducedMotion && t('settings.animations.description')}
        </p>
      </div>
      <AlertDialog
        open={state.isLogoutDialogOpen}
        onOpenChange={functions.handleLogoutDialogOpenChange}
      >
        <AlertDialogTrigger render={<Button />} disabled={mutations.logout.isPending}>
          <span aria-hidden="true" className="i-ph:sign-out-bold" />
          {t('settings.logout')}
        </AlertDialogTrigger>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('settings.logout.confirm.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('settings.logout.confirm.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {mutations.logout.isError && <InlineError>{t('settings.logout.error')}</InlineError>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={mutations.logout.isPending}>
              {t('action.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={functions.handleLogout}
              disabled={mutations.logout.isPending}
              aria-busy={mutations.logout.isPending}
            >
              {mutations.logout.isPending && <Loader />}
              {t('settings.logout')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
