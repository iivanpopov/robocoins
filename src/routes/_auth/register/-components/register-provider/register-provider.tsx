import { createContext, ReactNode, use, useMemo, useState } from 'react'

import type { RegisterDraft } from '../../-schemas'
import { registerDraft } from '../../-utils/register-draft'

interface RegisterContextValue {
  setState: (newState: Partial<RegisterDraft>) => void
  state: RegisterDraft
}

const RegisterContext = createContext<RegisterContextValue>({} as RegisterContextValue)

export interface RegisterProviderProps {
  initialState: RegisterDraft
  children: ReactNode
}

export function RegisterProvider({ initialState, children }: RegisterProviderProps) {
  const [state, setState] = useState<RegisterDraft>(initialState)

  const _setState = (newState: Partial<RegisterDraft>) => {
    const next = { ...state, ...newState }
    setState(next)
    registerDraft.save(next)
  }

  const contextValue = useMemo(() => ({ state, setState: _setState }), [state])

  return <RegisterContext value={contextValue}>{children}</RegisterContext>
}

export function useRegisterContext() {
  return use(RegisterContext)
}
