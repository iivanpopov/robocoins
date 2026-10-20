import { useState } from 'react'

export type UseBooleanReturn = [value: boolean, toggle: (value?: boolean) => void]

export const useBoolean = (initialValue = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialValue)

  const toggle = (value?: boolean) => {
    setValue((previousValue) => value ?? !previousValue)
  }

  return [value, toggle]
}
