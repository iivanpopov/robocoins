import { useTranslate } from '@kanjou/react'

import { HeroButton } from '#/components/ui/hero-button'
import { HeroInput } from '#/components/ui/hero-input'
import { Typography } from '#/components/ui/typography'
import { AuthLayout } from '#/routes/_auth/-components'

import { useStepName } from './hooks'

export function StepName() {
  const { functions, features } = useStepName()

  const t = useTranslate()

  return (
    <form className="flex flex-1 flex-col" onSubmit={functions.handleSubmit}>
      <AuthLayout.Root>
        <AuthLayout.Top>
          <Typography variant="title">{t('step.name.title')}</Typography>
          <Typography variant="caption">{t('step.name.description')}</Typography>
          <HeroInput
            name="name"
            aria-label={t('field.name.placeholder')}
            autoComplete="name"
            value={features.nameField.value}
            onChange={(event) => features.nameField.handleChange(event.target.value)}
            onBlur={features.nameField.handleBlur}
            aria-invalid={!!features.nameField.error}
            placeholder={t('field.name.placeholder')}
            className="mt-4"
          />
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
