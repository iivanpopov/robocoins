import * as Sentry from '@sentry/react'

import { LOCALSTORAGE_REGISTER_DRAFT } from '../-constants'
import { RegisterDraftSchema, type RegisterDraft } from '../-schemas'

export const registerDraft = {
  get: function () {
    try {
      const draft = JSON.parse(localStorage.getItem(LOCALSTORAGE_REGISTER_DRAFT)!)
      const parsed = RegisterDraftSchema.safeParse(draft)
      if (parsed.success) return parsed.data
      this.clear()
      return RegisterDraftSchema.parse({})
    } catch (error) {
      Sentry.captureException(error)
      this.clear()
      return RegisterDraftSchema.parse({})
    }
  },
  save: (data: RegisterDraft) => {
    localStorage.setItem(LOCALSTORAGE_REGISTER_DRAFT, JSON.stringify(data))
  },
  clear: () => {
    localStorage.removeItem(LOCALSTORAGE_REGISTER_DRAFT)
  },
}
