import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import * as v from 'valibot'

export type FormErrors<Values> = Partial<Record<keyof Values, string>>

export interface UseFormOptions<Values> {
  initialValues: Values
  schema?: v.GenericSchema
  customValidate?: (values: Values) => FormErrors<Values>
  validateOn?: 'change' | 'submit'
  onChange?: (values: Values) => void
  onSubmit?: (values: Values) => void | Promise<void>
}

export interface FieldRenderProps<Values, Name extends keyof Values> {
  name: string
  state: {
    value: Values[Name]
    meta: { errors: string[] }
  }
  handleChange: (value: Values[Name]) => void
  handleBlur: () => void
}

export interface FieldProps<Values, Name extends keyof Values> {
  name: Name
  children: (field: FieldRenderProps<Values, Name>) => ReactNode
}

export interface FormApi<Values> {
  state: {
    values: Values
    errors: FormErrors<Values>
    touched: Partial<Record<keyof Values, boolean>>
    isSubmitting: boolean
  }
  Field: <Name extends keyof Values>(props: FieldProps<Values, Name>) => ReactNode
  handleSubmit: () => Promise<void>
  setFieldValue: <Name extends keyof Values>(name: Name, value: Values[Name]) => void
  getValues: () => Values
  reset: (values?: Partial<Values>) => void
  clearErrors: (name?: keyof Values) => void
  setError: (name: keyof Values, error: string) => void
}

function resolveSchema<Values>(schema: v.GenericSchema): (values: Values) => FormErrors<Values> {
  return (values) => {
    const result = v.safeParse(schema, values)
    if (result.success) return {}
    const errors: Record<string, string> = {}
    for (const issue of result.issues) {
      const first = issue.path?.[0]
      if (first && typeof first === 'object' && 'key' in first && typeof first.key === 'string') {
        errors[first.key] = issue.message
      }
    }
    return errors as FormErrors<Values>
  }
}

export function useForm<Values extends object>(options: UseFormOptions<Values>): FormApi<Values> {
  const optionsRef = useRef(options)
  optionsRef.current = options

  const [state, setState] = useState({
    values: options.initialValues,
    errors: {} as FormErrors<Values>,
    touched: {} as Partial<Record<keyof Values, boolean>>,
    isSubmitting: false,
  })

  const stateRef = useRef(state)
  stateRef.current = state

  const validate = useCallback((values: Values): FormErrors<Values> => {
    const opts = optionsRef.current
    if (opts.customValidate) return opts.customValidate(values)
    if (opts.schema) return resolveSchema(opts.schema)(values)
    return {}
  }, [])

  const setFieldValue = useCallback(
    <Name extends keyof Values>(name: Name, value: Values[Name]) => {
      const opts = optionsRef.current
      const previous = stateRef.current
      const values = { ...previous.values, [name]: value } as Values
      let errors: FormErrors<Values>
      if (opts.validateOn === 'submit') {
        const next = { ...previous.errors } as FormErrors<Values>
        delete next[name]
        errors = next
      } else {
        errors = validate(values)
      }
      setState({ ...previous, values, errors })
      opts.onChange?.(values)
    },
    [validate],
  )

  const getValues = useCallback(() => stateRef.current.values, [])

  const reset = useCallback((values?: Partial<Values>) => {
    const opts = optionsRef.current
    const nextValues = values
      ? ({ ...opts.initialValues, ...values } as Values)
      : (opts.initialValues as Values)
    setState({ values: nextValues, errors: {}, touched: {}, isSubmitting: false })
  }, [])

  const clearErrors = useCallback((name?: keyof Values) => {
    setState((previous) => {
      if (!name) return { ...previous, errors: {} }
      const errors = { ...previous.errors } as FormErrors<Values>
      delete errors[name]
      return { ...previous, errors }
    })
  }, [])

  const setError = useCallback((name: keyof Values, error: string) => {
    setState((previous) => ({ ...previous, errors: { ...previous.errors, [name]: error } }))
  }, [])

  const handleBlur = useCallback((name: keyof Values) => {
    setState((previous) => {
      if (previous.touched[name]) return previous
      return { ...previous, touched: { ...previous.touched, [name]: true } }
    })
  }, [])

  const handleSubmit = useCallback(async () => {
    const opts = optionsRef.current
    const values = stateRef.current.values
    const errors = validate(values)
    setState((previous) => ({ ...previous, errors }))
    if (Object.keys(errors).length) return

    setState((previous) => ({ ...previous, isSubmitting: true }))
    try {
      await opts.onSubmit?.(values)
    } finally {
      setState((previous) => ({ ...previous, isSubmitting: false }))
    }
  }, [validate])

  return useMemo<FormApi<Values>>(() => {
    const Field = <Name extends keyof Values>(props: FieldProps<Values, Name>): ReactNode => {
      const current = stateRef.current
      const error = current.errors[props.name]
      return props.children({
        name: String(props.name),
        state: {
          value: current.values[props.name],
          meta: { errors: error ? [error] : [] },
        },
        handleChange: (value) => setFieldValue(props.name, value),
        handleBlur: () => handleBlur(props.name),
      })
    }

    return {
      get state() {
        return stateRef.current
      },
      Field,
      handleSubmit,
      setFieldValue,
      getValues,
      reset,
      clearErrors,
      setError,
    }
  }, [handleSubmit, setFieldValue, getValues, reset, clearErrors, setError, handleBlur])
}
