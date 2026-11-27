import * as v from 'valibot'

const GoogleLoginNoticeSchema = v.picklist(['not_linked', 'session_expired', 'error'])
const GoogleSettingsNoticeSchema = v.picklist(['already_linked', 'error'])

export type GoogleLoginNotice = v.InferOutput<typeof GoogleLoginNoticeSchema>
export type GoogleSettingsNotice = v.InferOutput<typeof GoogleSettingsNoticeSchema>

export function validateGoogleLoginSearch(search: Record<string, unknown>): {
  google?: GoogleLoginNotice
} {
  if (v.is(GoogleLoginNoticeSchema, search.google)) return { google: search.google }
  return {}
}

export function validateGoogleSettingsSearch(search: Record<string, unknown>): {
  google?: GoogleSettingsNotice
} {
  if (v.is(GoogleSettingsNoticeSchema, search.google)) return { google: search.google }
  return {}
}
