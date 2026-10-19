import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import {
  HeroButton,
  HeroCarousel,
  HeroCarouselContent,
  HeroCarouselItem,
  Typography,
} from '#/components/ui'
import { getAvatarUrl } from '#/routes/-utils/get-avatar-url'
import { AuthLayout } from '#/routes/_auth/-components'

import { AVATARS } from '../../../-constants'
import { RegisterBackCaption } from '../../register-back-caption'
import { useStepAvatar } from './hooks'

import styles from './step-avatar.module.css'

export function StepAvatar() {
  const { state, functions } = useStepAvatar()

  const t = useTranslate()

  return (
    <form className="flex flex-1 flex-col" onSubmit={functions.handleSubmit}>
      <AuthLayout.Root>
        <AuthLayout.Top>
          <Typography variant="title">{t('step.avatar.title')}</Typography>
        </AuthLayout.Top>
        <AuthLayout.Bottom style={{ marginTop: 0 }}>
          <HeroCarousel
            className="mt-4"
            opts={{ startIndex: state.initialIndex }}
            setApi={functions.setApi}
          >
            <HeroCarouselContent>
              {AVATARS.map((avatar) => (
                <HeroCarouselItem key={avatar}>
                  <img
                    src={getAvatarUrl(avatar)}
                    alt={avatar}
                    draggable={false}
                    className={cn(styles.avatar, 'w-full h-auto select-none pointer-events-none')}
                  />
                </HeroCarouselItem>
              ))}
            </HeroCarouselContent>
          </HeroCarousel>

          <HeroButton type="submit" className="mt-8">
            {t('action.next.title')}
          </HeroButton>
          <RegisterBackCaption search={state.previousSearch} />
        </AuthLayout.Bottom>
      </AuthLayout.Root>
    </form>
  )
}
