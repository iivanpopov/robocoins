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
  Checkbox,
  Field,
  FieldDescription,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
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

      {state.user?.role === 'student' && (
        <section className={styles.section}>
          <h2 className={styles['section-title']}>{t('settings.section.account')}</h2>
          <Field>
            <FieldLabel htmlFor="settings-password">{t('settings.password')}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="settings-password"
                type={state.isPasswordVisible ? 'text' : 'password'}
                value={state.password}
                readOnly
                autoComplete="off"
                placeholder={t('field.password.placeholder')}
                aria-describedby="settings-password-description"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={functions.handleTogglePassword}
                  aria-label={
                    state.isPasswordVisible ? t('field.password.hide') : t('field.password.show')
                  }
                  aria-pressed={state.isPasswordVisible}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      state.isPasswordVisible && 'i-ph:eye-slash-bold',
                      !state.isPasswordVisible && 'i-ph:eye-bold',
                    )}
                  />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription id="settings-password-description">
              {t('settings.password.description')}
            </FieldDescription>
            {queries.credentials.isError && (
              <InlineError
                onRetry={functions.handleRetryCredentials}
                isRetrying={queries.credentials.isFetching}
              >
                {t('settings.credentials.error')}
              </InlineError>
            )}
          </Field>
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
          <FieldLabel htmlFor="settings-animations">{t('settings.animations.disable')}</FieldLabel>
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
    </section>
  )
}
