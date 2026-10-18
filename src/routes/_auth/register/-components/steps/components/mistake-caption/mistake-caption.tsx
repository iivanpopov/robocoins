import { useTranslate } from '@kanjou/react'
import { ReactNode } from 'react'

import { Button, Typography } from '#/components/ui'

import { RegisterStep } from '../../../../-schemas'
import { useRegisterContext } from '../../../register-provider'

import styles from './mistake-caption.module.css'

interface BackProps {
  to: RegisterStep
  children: ReactNode
}

function Back({ children, to }: BackProps) {
  const register = useRegisterContext()

  return (
    <Button
      className={styles['back-link']}
      variant="link"
      onClick={() => register.setState({ step: to })}
    >
      <Typography variant="caption">{children}</Typography>
    </Button>
  )
}

export interface MistakeCaptionProps {
  to: RegisterStep
}

const COMPONENTS = { components: { a: Back } }

export function MistakeCaption({ to }: MistakeCaptionProps) {
  const t = useTranslate()

  return (
    <Typography variant="caption" className="text-center mt-4">
      {t.rich('caption.mistake', { to }, COMPONENTS)}
    </Typography>
  )
}
