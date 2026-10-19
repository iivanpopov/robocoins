import { useTranslate } from '@kanjou/react'
import type { ComponentProps } from 'react'

import { Typography } from '#/components/ui'
import type { AppLink } from '#/routes/-components'

import type { RegisterStepSearch } from '../../-hooks/use-register-category-step'

export function RegisterBackCaption(props: {
  search: RegisterStepSearch
  viewTransition?: ComponentProps<typeof AppLink>['viewTransition']
}) {
  const t = useTranslate()

  return (
    <Typography variant="caption" className="text-center mt-6">
      {t.rich('caption.mistake', {
        search: props.search,
        viewTransition: props.viewTransition ?? { types: ['register-backward'] },
      })}
    </Typography>
  )
}
