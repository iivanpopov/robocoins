import * as v from 'valibot'

export const GoogleOAuthStartSchema = v.object({ authorization_url: v.string() })

export const GoogleLinkSchema = v.object({
  linked: v.boolean(),
  email: v.nullish(v.string()),
})

export const GoogleOAuthCallbackSchema = v.object({
  status: v.picklist([
    'login',
    'linked',
    'not_linked',
    'already_linked',
    'session_expired',
    'cancelled',
    'invalid_state',
    'verification_failed',
    'profile_missing',
  ]),
})
