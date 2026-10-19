import * as Sentry from '@sentry/react'

import { LOCALSTORAGE_REGISTER_DRAFT } from '../-constants'
import { RegisterDraft } from '../-schemas'

export const registerDraft = {
  get: function () {
    try {
      const draft = JSON.parse(localStorage.getItem(LOCALSTORAGE_REGISTER_DRAFT)!)
      const parsed = RegisterDraft.safeParse(draft)
      if (parsed.data?.version === 1) return draft
      this.clear()
      return {}
    } catch (error) {
      Sentry.captureException(error)
      this.clear()
      return {}
    }
  },
  save: (data: RegisterDraft) => {
    localStorage.setItem(LOCALSTORAGE_REGISTER_DRAFT, JSON.stringify(data))
  },
  clear: () => {
    localStorage.removeItem(LOCALSTORAGE_REGISTER_DRAFT)
  },
}
