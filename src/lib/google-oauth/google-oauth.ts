import * as v from 'valibot'

import { client, type RequestConfig } from '#/api/.kubb/client'

import { GoogleOAuthCallbackSchema, GoogleOAuthStartSchema, GoogleLinkSchema } from './schemas'

const FLOW_STORAGE_KEY = 'robocoins.google-oauth'

type GoogleOAuthFlow = 'login' | 'link'

async function requestGoogleOAuth(
  path: string,
  options?: Pick<RequestConfig, 'method' | 'signal'>,
) {
  const result = await client({
    url: `/auth/google/${path}`,
    ...options,
    credentials: 'same-origin',
    options: {
      cache: 'no-store',
      redirect: 'error',
      referrerPolicy: 'no-referrer',
    },
    parseAs: 'json',
  })
  return result.data
}

export async function startGoogleOAuth(flow: GoogleOAuthFlow) {
  const result = v.parse(
    GoogleOAuthStartSchema,
    await requestGoogleOAuth(flow, { method: flow === 'link' ? 'POST' : 'GET' }),
  )
  const url = new URL(result.authorization_url)
  const state = url.searchParams.get('state')
  if (url.origin !== 'https://accounts.google.com' || !state) {
    throw new Error('Invalid Google authorization URL')
  }
  sessionStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify({ state, flow }))
  window.location.assign(url.href)
}

function takeGoogleOAuthFlow(state: string | null): GoogleOAuthFlow {
  if (!state) return 'login'

  try {
    const stored = sessionStorage.getItem(FLOW_STORAGE_KEY)
    if (!stored) return 'login'
    const attempt: unknown = JSON.parse(stored)
    if (
      typeof attempt !== 'object' ||
      !attempt ||
      !('state' in attempt) ||
      attempt.state !== state
    ) {
      return 'login'
    }
    sessionStorage.removeItem(FLOW_STORAGE_KEY)
    if ('flow' in attempt && attempt.flow === 'link') return 'link'
  } catch {
    return 'login'
  }

  return 'login'
}

export async function completeGoogleOAuth(parameters: URLSearchParams) {
  const flow = takeGoogleOAuthFlow(parameters.get('state'))

  try {
    const result = v.parse(
      GoogleOAuthCallbackSchema,
      await requestGoogleOAuth(`callback?${parameters}`),
    )
    return { flow, status: result.status }
  } catch {
    return { flow, status: 'error' } as const
  }
}

export async function getGoogleLink(signal: AbortSignal) {
  return v.parse(GoogleLinkSchema, await requestGoogleOAuth('status', { signal }))
}

export async function unlinkGoogleAccount() {
  const link = v.parse(GoogleLinkSchema, await requestGoogleOAuth('link', { method: 'DELETE' }))
  if (link.linked) throw new Error('Google account is still linked')
  return link
}
