import { useTranslate } from '@kanjou/react'

import {
  HeroButton,
  HeroCarousel,
  HeroCarouselContent,
  HeroCarouselItem,
  Typography,
} from '#/components/ui'
import { getAvatarUrl } from '#/routes/-utils/get-avatar-url'

import { AVATARS, RegisterStep } from '../../../-constants'
import { useStepAvatar } from './hooks'

export function StepAvatar() {
  const { state, functions } = useStepAvatar()

  const t = useTranslate()

  return (
    <form className="flex flex-1 flex-col" onSubmit={functions.handleSubmit}>
      <Typography variant="title">{t('step.avatar.title')}</Typography>
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
                className="w-full h-full select-none pointer-events-none"
              />
            </HeroCarouselItem>
          ))}
        </HeroCarouselContent>
      </HeroCarousel>

      <div className="flex-1 flex flex-col justify-end">
        <HeroButton type="submit">{t('action.next.title')}</HeroButton>
        <Typography variant="caption" className="text-center mt-4">
          {t.rich('caption.mistake', { search: { step: RegisterStep.Schedule } })}
        </Typography>
      </div>
    </form>
  )
}
