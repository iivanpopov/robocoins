import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'

import { HeroButton, Loader, Typography } from '#/components/ui'

import { AuthLayout } from '../-components'
import { HeroPasswordInput } from './-components'
import { useLoginPage } from './-hooks'

export const Route = createFileRoute('/_auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { functions, features, mutations } = useLoginPage()

  const t = useTranslate()

  return (
    <form className="flex flex-1 flex-col" onSubmit={functions.handleSubmit}>
      <AuthLayout.Root>
        <AuthLayout.Top>
          <Typography variant="title">{t('action.login.title')}</Typography>
          <Typography variant="caption">{t('action.login.description')}</Typography>
          <features.form.Field name="password">
            {(field) => (
              <HeroPasswordInput
                name={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={!!field.state.meta.errors.length}
                className="mt-4"
              />
            )}
          </features.form.Field>
        </AuthLayout.Top>

        <AuthLayout.Bottom>
          <HeroButton type="submit" className="w-full" disabled={mutations.login.isPending}>
            {features.form.state.isSubmitting && <Loader />}
            {!features.form.state.isSubmitting && t('action.enter.title')}
          </HeroButton>
          <Typography variant="caption" className="text-center mt-6">
            {t.rich('caption.has-no-account', { to: '/register' })}
          </Typography>
        </AuthLayout.Bottom>
      </AuthLayout.Root>
    </form>
  )
}
