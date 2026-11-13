import { ReactNode, use, useMemo, useState } from 'react'

import type { RegisterDraft } from '../../-schemas'
import { registerDraft } from '../../-utils/register-draft'
import { RegisterContext } from './lib'

export interface RegisterProviderProps {
  initialState: RegisterDraft
  children: ReactNode
}

export function RegisterProvider({ initialState, children }: RegisterProviderProps) {
  const [state, setState] = useState<RegisterDraft>(initialState ?? {})
  const [accessCode, setAccessCode] = useState<string>()

  const _setState = async (newState: Partial<RegisterDraft>) => {
    const next = { ...state, ...newState }
    setState(next)
    await registerDraft.save(next)
  }

  const contextValue = useMemo(
    () => ({ state, setState: _setState, accessCode, setAccessCode }),
    [state, accessCode],
  )

  return <RegisterContext value={contextValue}>{children}</RegisterContext>
}

export function useRegisterDraft() {
  const register = use(RegisterContext)

  if (!register) throw new Error('Registration draft provider is unavailable')
  return register
}
