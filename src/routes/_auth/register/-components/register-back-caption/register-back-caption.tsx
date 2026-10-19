import { useTranslate } from '@kanjou/react'

import { Typography } from '#/components/ui'

import type { RegisterStepSearch } from '../../-hooks/use-register-category-step'

export function RegisterBackCaption(props: { search: RegisterStepSearch }) {
  const t = useTranslate()

  return (
    <Typography variant="caption" className="text-center mt-6">
      {t.rich('caption.mistake', { search: props.search })}
    </Typography>
  )
}
