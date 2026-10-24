import { useTranslate } from '@kanjou/react'
import { useId } from 'react'

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '#/components/ui'

import styles from './student-details.module.css'

export function StudentDetails() {
  const passwordId = useId()
  const t = useTranslate()

  return (
    <div className={styles.details}>
      <label htmlFor={passwordId}>{t('settings.password')}</label>
      <InputGroup>
        <InputGroupInput
          id={passwordId}
          type="password"
          value=""
          readOnly
          autoComplete="off"
          placeholder={t('student.password.unavailable')}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="md"
            disabled
            aria-label={t('field.password.show')}
            title={t('student.password.unavailable')}
          >
            <span aria-hidden="true" className="i-ph:eye" />
          </InputGroupButton>
          <InputGroupButton
            size="md"
            disabled
            aria-label={t('student.password.regenerate')}
            title={t('student.password.regenerate')}
          >
            <span aria-hidden="true" className="i-ph:arrows-clockwise" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
