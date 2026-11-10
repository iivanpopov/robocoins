import { useCallback, useMemo, useRef, useState } from 'react'
import * as v from 'valibot'

export interface UseFieldOptions<Value> {
  schema?: v.GenericSchema
  customValidate?: (value: Value) => string | undefined
  validateOn?: 'change' | 'blur' | 'submit'
  onChange?: (value: Value) => void
  onSubmit?: (value: Value) => void | Promise<void>
}

export interface FieldApi<Value> {
  readonly value: Value
  readonly error: string | undefined
  readonly dirty: boolean
  readonly touched: boolean
  readonly isSubmitting: boolean
  handleChange: (value: Value) => void
  setValue: (value: Value) => void
  handleBlur: () => void
  handleSubmit: () => Promise<void>
  reset: (value?: Value) => void
  getValue: () => Value
  clearError: () => void
  setError: (error: string) => void
}

interface FieldState<Value> {
  value: Value
  error: string | undefined
  touched: boolean
  isSubmitting: boolean
}

export function useField<Value>(
  initialValue: Value,
  options?: UseFieldOptions<Value>,
): FieldApi<Value> {
  const optionsRef = useRef(options)
  optionsRef.current = options

  const [state, setState] = useState<FieldState<Value>>({
    value: initialValue,
    error: undefined,
    touched: false,
    isSubmitting: false,
  })

  const stateRef = useRef(state)
  stateRef.current = state

  const baselineRef = useRef(initialValue)
  const submittingRef = useRef(false)

  const commit = useCallback((next: FieldState<Value>) => {
    stateRef.current = next
    setState(next)
  }, [])

  const validate = useCallback((value: Value): string | undefined => {
    const currentOptions = optionsRef.current
    if (currentOptions?.customValidate) return currentOptions.customValidate(value)
    if (currentOptions?.schema) {
      const result = v.safeParse(currentOptions.schema, value)
      if (!result.success) return result.issues[0]?.message
    }
    return undefined
  }, [])

  const updateValue = useCallback(
    (value: Value) => {
      const currentOptions = optionsRef.current
      const previous = stateRef.current
      const validateOn = currentOptions?.validateOn ?? 'change'
      let error: string | undefined
      if (validateOn === 'change') {
        error = validate(value)
      } else if (validateOn === 'submit') {
        error = undefined
      } else {
        error = previous.error
      }
      commit({ ...previous, value, error })
      currentOptions?.onChange?.(value)
    },
    [commit, validate],
  )

  const handleChange = useCallback(
    (value: Value) => {
      updateValue(value)
    },
    [updateValue],
  )

  const setValue = useCallback(
    (value: Value) => {
      updateValue(value)
    },
    [updateValue],
  )

  const handleBlur = useCallback(() => {
    const currentOptions = optionsRef.current
    const previous = stateRef.current
    const validateOn = currentOptions?.validateOn ?? 'change'
    const error = validateOn === 'blur' ? validate(previous.value) : previous.error
    commit({ ...previous, error, touched: true })
  }, [commit, validate])

  const handleSubmit = useCallback(async () => {
    if (submittingRef.current) return
    const currentOptions = optionsRef.current
    const previous = stateRef.current
    const error = validate(previous.value)
    if (error !== undefined) {
      commit({ ...previous, error, touched: true })
      return
    }
    submittingRef.current = true
    commit({ ...previous, error: undefined, touched: true, isSubmitting: true })
    try {
      await currentOptions?.onSubmit?.(previous.value)
    } finally {
      submittingRef.current = false
      commit({ ...stateRef.current, isSubmitting: false })
    }
  }, [commit, validate])

  const reset = useCallback(
    (value?: Value) => {
      const nextValue = value === undefined ? baselineRef.current : value
      baselineRef.current = nextValue
      commit({
        value: nextValue,
        error: undefined,
        touched: false,
        isSubmitting: submittingRef.current,
      })
    },
    [commit],
  )

  const getValue = useCallback(() => stateRef.current.value, [])

  const clearError = useCallback(() => {
    commit({ ...stateRef.current, error: undefined })
  }, [commit])

  const setError = useCallback(
    (error: string) => {
      commit({ ...stateRef.current, error })
    },
    [commit],
  )

  return useMemo<FieldApi<Value>>(
    () => ({
      get value() {
        return stateRef.current.value
      },
      get error() {
        return stateRef.current.error
      },
      get dirty() {
        return !Object.is(stateRef.current.value, baselineRef.current)
      },
      get touched() {
        return stateRef.current.touched
      },
      get isSubmitting() {
        return stateRef.current.isSubmitting
      },
      handleChange,
      setValue,
      handleBlur,
      handleSubmit,
      reset,
      getValue,
      clearError,
      setError,
    }),
    [handleChange, setValue, handleBlur, handleSubmit, reset, getValue, clearError, setError],
  )
}
