import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { GoogleIcon } from '#/components/google-icon'
import { HeroButton, Loader, Typography } from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { validateGoogleLoginSearch } from '#/routes/-utils'

import { AuthLayout } from '../-components'
import { HeroPasswordInput } from './-components'
import { useLoginPage } from './-hooks'

export const Route = createFileRoute('/_auth/login/')({
  validateSearch: validateGoogleLoginSearch,
  component: RouteComponent,
})

function RouteComponent() {
  const { state, mutations, functions, features } = useLoginPage()

  const t = useTranslate()

  return (
    <form method="post" className="flex flex-1 flex-col" onSubmit={functions.handleSubmit}>
      <AuthLayout.Root>
        <AuthLayout.Top>
          <Typography variant="title">{t('action.login.title')}</Typography>
          <Typography variant="caption">{t('action.login.description')}</Typography>
          <HeroPasswordInput
            id="password"
            name="password"
            value={features.passwordField.value}
            onChange={(event) => features.passwordField.handleChange(event.target.value)}
            onBlur={features.passwordField.handleBlur}
            aria-invalid={!!features.passwordField.error || mutations.login.isError}
            className="mt-4"
          />
          {mutations.login.isError && (
            <InlineError id="password-error" className="mt-4">
              {t('error.incorrect-password')}
            </InlineError>
          )}
        </AuthLayout.Top>

        <AuthLayout.Bottom>
          <HeroButton type="submit" className="w-full" disabled={state.isSignInDisabled}>
            {features.passwordField.isSubmitting && <Loader />}
            {!features.passwordField.isSubmitting && t('action.enter.title')}
          </HeroButton>
          <HeroButton
            type="button"
            data-variant="light"
            className="mt-3 w-full gap-2"
            disabled={state.isSignInDisabled}
            onClick={functions.handleGoogleLogin}
            aria-busy={mutations.google.isPending}
          >
            <GoogleIcon />
            {t('auth.google.button')}
          </HeroButton>
          {state.googleNotice === 'not_linked' && (
            <InlineError className="mt-3">{t('auth.google.not-linked')}</InlineError>
          )}
          {state.googleNotice === 'session_expired' && (
            <InlineError className="mt-3">{t('auth.google.session-expired')}</InlineError>
          )}
          {(state.googleNotice === 'error' || mutations.google.isError) && (
            <InlineError className="mt-3">{t('auth.google.error')}</InlineError>
          )}
          <Typography variant="caption" className="text-center mt-6">
            {t.rich('caption.has-no-account', { to: '/register' })}
          </Typography>
        </AuthLayout.Bottom>
      </AuthLayout.Root>
    </form>
  )
}
