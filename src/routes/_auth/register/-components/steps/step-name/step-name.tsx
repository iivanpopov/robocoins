import { useTranslate } from '@kanjou/react'

import { HeroButton, HeroInput, Typography } from '#/components/ui'
import { AuthLayout } from '#/routes/_auth/-components'

import { useStepName } from './-hooks'

export function StepName() {
  const { functions, features } = useStepName()

  const t = useTranslate()

  return (
    <form className="flex flex-1 flex-col" onSubmit={functions.handleSubmit}>
      <AuthLayout.Root>
        <AuthLayout.Top>
          <Typography variant="title">{t('step.name.title')}</Typography>
          <Typography variant="caption">{t('step.name.description')}</Typography>
          <features.form.Field name="name">
            {(field) => (
              <HeroInput
                name={field.name}
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={!!field.state.meta.errors.length}
                placeholder={t('field.name.placeholder')}
                className="mt-4"
              />
            )}
          </features.form.Field>
        </AuthLayout.Top>

        <AuthLayout.Bottom>
          <HeroButton type="submit" className="w-full">
            {t('action.next.title')}
          </HeroButton>
          <Typography variant="caption" className="text-center mt-6">
            {t.rich('caption.has-account', { to: '/login' })}
          </Typography>
        </AuthLayout.Bottom>
      </AuthLayout.Root>
    </form>
  )
}
