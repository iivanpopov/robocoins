import { useTranslate } from '@kanjou/react'

import {
  HeroInput,
  HeroInputGroup,
  HeroInputGroupButton,
  type HeroInputProps,
} from '#/components/ui'
import { useBoolean } from '#/hooks'
import { cn } from '#/utils/cn'

export interface HeroPasswordInputProps extends Omit<HeroInputProps, 'className'> {
  className?: string
}

export function HeroPasswordInput({ className, ...props }: HeroPasswordInputProps) {
  const [isRevealed, toggleRevealed] = useBoolean()
  const t = useTranslate()

  let type: 'password' | 'text' = 'password'
  let label = t('field.password.show')

  if (isRevealed) {
    type = 'text'
    label = t('field.password.hide')
  }

  return (
    <HeroInputGroup className={className}>
      <HeroInput {...props} placeholder={t('field.password.caption')} type={type} />
      <HeroInputGroupButton
        onClick={() => toggleRevealed()}
        aria-pressed={isRevealed}
        aria-label={label}
      >
        <div className={cn('i-ph:eye', isRevealed && 'hidden')} />
        <div className={cn('i-ph:eye-slash', !isRevealed && 'hidden')} />
      </HeroInputGroupButton>
    </HeroInputGroup>
  )
}
