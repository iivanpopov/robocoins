import { type ReactNode, useState } from 'react'

import {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '#/components/ui'
import { cn } from '#/utils/cn'

export function MaskedReadOnlyField(props: {
  id: string
  label: string
  value: string
  showLabel: string
  hideLabel?: string
  placeholder?: string
  children?: ReactNode
}) {
  const [isVisible, setIsVisible] = useState(false)

  const inputType = isVisible ? 'text' : 'password'
  const toggleLabel = isVisible && props.hideLabel ? props.hideLabel : props.showLabel

  function handleToggle() {
    setIsVisible((value) => !value)
  }

  return (
    <Field>
      <FieldLabel htmlFor={props.id}>{props.label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={props.id}
          type={inputType}
          value={props.value}
          placeholder={props.placeholder}
          readOnly
          autoComplete="off"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            aria-label={toggleLabel}
            aria-pressed={isVisible}
            onClick={handleToggle}
          >
            <span
              aria-hidden="true"
              className={cn(isVisible && 'i-ph:eye-slash', !isVisible && 'i-ph:eye')}
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {props.children}
    </Field>
  )
}
