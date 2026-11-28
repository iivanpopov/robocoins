import * as v from 'valibot'

import { readExpiringStorage, writeExpiringStorage } from '#/utils/storage'

import { REGISTER_DRAFT_STORAGE_KEY, REGISTER_DRAFT_TTL_IN_MS } from '../-constants'
import { RegisterDraftSchema, type RegisterDraft } from '../-schemas'

function parseRegisterDraft(value: unknown) {
  if (!value) return v.parse(RegisterDraftSchema, {})

  const draft = v.safeParse(RegisterDraftSchema, value)
  if (draft.success) return draft.output
  return v.parse(RegisterDraftSchema, {})
}

export const registerDraft = {
  get: () => parseRegisterDraft(readExpiringStorage(REGISTER_DRAFT_STORAGE_KEY)),
  save: (data: RegisterDraft) =>
    writeExpiringStorage(REGISTER_DRAFT_STORAGE_KEY, data, REGISTER_DRAFT_TTL_IN_MS),
  clear: () => localStorage.removeItem(REGISTER_DRAFT_STORAGE_KEY),
}
