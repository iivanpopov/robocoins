import { useTranslate } from '@kanjou/react'

import {
  Button,
  HeroButton,
  HeroCarousel,
  HeroCarouselContent,
  HeroCarouselItem,
  Typography,
} from '#/components/ui'
import { AVATARS } from '#/routes/-constants'
import { getAvatarUrl } from '#/routes/-utils'
import { AuthLayout } from '#/routes/_auth/-components'

import { RegisterBackCaption } from '../../register-back-caption'
import { useStepAvatar } from './-hooks'

import styles from './step-avatar.module.css'

export function StepAvatar() {
  const { state, functions } = useStepAvatar()

  const t = useTranslate()

  return (
    <form className="flex flex-1 flex-col" onSubmit={functions.handleSubmit}>
      <AuthLayout.Root>
        <AuthLayout.Top>
          <Typography variant="title">{t('step.avatar.title')}</Typography>
          <Typography variant="caption">{t('step.avatar.description')}</Typography>
          <Button type="button" variant="link" className={styles['suggest-avatar']}>
            {t('step.avatar.suggest')}
          </Button>
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
                    className={styles.avatar}
                  />
                </HeroCarouselItem>
              ))}
            </HeroCarouselContent>
          </HeroCarousel>

          <HeroButton type="submit" className={styles['next-button']}>
            {t('action.next.title')}
          </HeroButton>
          <RegisterBackCaption search={state.previousSearch} />
        </AuthLayout.Bottom>
      </AuthLayout.Root>
    </form>
  )
}
