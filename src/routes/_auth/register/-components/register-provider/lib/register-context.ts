import { createContext } from 'react'

import type { RegisterDraft } from '../../../-schemas'

interface RegisterContextValue {
  accessCode: string | undefined
  setAccessCode: (accessCode: string) => void
  setState: (newState: Partial<RegisterDraft>) => Promise<void>
  state: RegisterDraft
}

export const RegisterContext = createContext<RegisterContextValue | null>(null)
