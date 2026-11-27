import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

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
  Checkbox,
  Field,
  FieldDescription,
  FieldLabel,
  Loader,
} from '#/components/ui'
import { InlineError, PageLayout } from '#/routes/-components'
import { validateGoogleSettingsSearch } from '#/routes/-utils'

import { GoogleAccountSettings, MaskedReadOnlyField } from './-components'
import { useSettingsPage } from './-hooks'

import styles from './index.module.css'

export const Route = createFileRoute('/_authorized/_navigation/settings/')({
  validateSearch: validateGoogleSettingsSearch,
  head: () => ({ meta: [{ title: 'Налаштування | Robocoins' }] }),
  component: SettingsPage,
})

function SettingsPage() {
  const { state, queries, mutations, functions } = useSettingsPage()

  const t = useTranslate()

  return (
    <PageLayout.Root variant={state.pageLayoutVariant} className={styles.page}>
      <PageLayout.Header>
        <PageLayout.Heading>
          <PageLayout.Title>{t('navbar.settings')}</PageLayout.Title>
        </PageLayout.Heading>
      </PageLayout.Header>

      {state.isStudent && state.user && (
        <section className={styles.section}>
          <h2 className={styles['section-title']}>{t('settings.section.sign-in')}</h2>
          <MaskedReadOnlyField
            key={`code-${state.user.user_id}`}
            id="settings-password"
            label={t('settings.password')}
            value={state.password}
            showLabel={t('field.password.show')}
            hideLabel={t('field.password.hide')}
            placeholder={t('field.password.caption')}
          >
            {queries.credentials.isError && (
              <InlineError
                onRetry={functions.handleRetryCredentials}
                isRetrying={queries.credentials.isFetching}
              >
                {t('settings.credentials.error')}
              </InlineError>
            )}
          </MaskedReadOnlyField>
          <GoogleAccountSettings
            key={state.user.user_id}
            userId={state.user.user_id}
            googleNotice={state.googleNotice}
          />
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles['section-title']}>{t('settings.section.appearance')}</h2>
        <Field orientation="horizontal">
          <Checkbox
            id="settings-animations"
            size="lg"
            checked={state.animationsReduced}
            disabled={state.isSystemReducedMotion}
            onCheckedChange={functions.handleAnimationsChange}
            aria-describedby="settings-animations-description"
          />
          <FieldLabel htmlFor="settings-animations" className={styles['checkbox-label']}>
            {t('settings.animations.disable')}
          </FieldLabel>
        </Field>
        {state.isSystemReducedMotion && (
          <FieldDescription id="settings-animations-description">
            {t('settings.animations.system')}
          </FieldDescription>
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles['section-title']}>{t('settings.section.session')}</h2>
        <AlertDialog
          open={state.isLogoutDialogOpen}
          onOpenChange={functions.handleLogoutDialogOpenChange}
        >
          <AlertDialogTrigger
            render={<Button variant="contain" className={styles.logout} />}
            disabled={mutations.logout.isPending}
          >
            <span aria-hidden="true" className="i-ph:sign-out" />
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
                className={styles.logout}
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
    </PageLayout.Root>
  )
}
