import { COOKIE_MAX_AGE } from '#/routes/-constants'
import { readCookie } from '#/utils/cookies'

import { REGISTER_DRAFT_COOKIE } from '../-constants'
import { RegisterDraftSchema, type RegisterDraft } from '../-schemas'

function parseRegisterDraft(value: string | null) {
  if (!value) return RegisterDraftSchema.parse({})
  try {
    const draft = RegisterDraftSchema.safeParse(JSON.parse(value))
    if (draft.success) return draft.data
    return RegisterDraftSchema.parse({})
  } catch {
    return RegisterDraftSchema.parse({})
  }
}

export const registerDraft = {
  get: async () => parseRegisterDraft(await readCookie(REGISTER_DRAFT_COOKIE)),
  save: (data: RegisterDraft) =>
    cookieStore.set({
      name: REGISTER_DRAFT_COOKIE,
      value: encodeURIComponent(JSON.stringify(data)),
      path: '/',
      expires: Date.now() + COOKIE_MAX_AGE,
      sameSite: 'lax',
    }),
  clear: () => cookieStore.delete({ name: REGISTER_DRAFT_COOKIE, path: '/' }),
}
