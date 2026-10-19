import { useTranslate } from '@kanjou/react'
import { createFileRoute } from '@tanstack/react-router'
import { cn } from 'cn'

import { HeroButton, Loader, Typography } from '#/components/ui'

import { HeroPasswordInput } from './-components'
import { useLoginPage } from './-hooks'

export const Route = createFileRoute('/_auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { state, functions, features, mutations } = useLoginPage()

  const t = useTranslate()

  return (
    <form className="flex flex-1 flex-col" onSubmit={functions.handleSubmit}>
      <Typography variant="title">{t('action.login.title')}</Typography>
      <Typography variant="caption">{t('action.login.description')}</Typography>
      <features.form.Field name="password">
        {(field) => (
          <HeroPasswordInput
            name={field.name}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onFocus={functions.handlePasswordFocus}
            onBlur={() => {
              field.handleBlur()
              functions.handlePasswordBlur()
            }}
            aria-invalid={!!field.state.meta.errors.length}
            className="mt-4"
          />
        )}
      </features.form.Field>

      <div
        className={cn(
          'shrink-0 transition-[flex-grow] duration-200 ease-out motion-reduce:transition-none',
          state.isPasswordFocused && 'grow-0 delay-0',
          !state.isPasswordFocused && 'grow delay-75',
        )}
      />

      <div className="mt-6 flex flex-col">
        <HeroButton type="submit" className="w-full" disabled={mutations.login.isPending}>
          {features.form.state.isSubmitting && <Loader />}
          {!features.form.state.isSubmitting && t('action.enter.title')}
        </HeroButton>
        <Typography variant="caption" className="text-center mt-6">
          {t.rich('caption.has-no-account', { to: '/register' })}
        </Typography>
      </div>
    </form>
  )
}
