import { useEffect, useRef } from 'react'

import { completeGoogleOAuth } from '#/lib/google-oauth'
import { getSession } from '#/routes/-actions/get-session'
import { type GoogleLoginNotice, type GoogleSettingsNotice, getHomePath } from '#/routes/-utils'

function getLoginPath(notice: GoogleLoginNotice) {
  return `/login?google=${notice}`
}

function getSettingsPath(notice: GoogleSettingsNotice) {
  return `/settings?google=${notice}`
}

async function getCallbackDestination() {
  const url = new URL(window.location.href)
  const parameters = new URLSearchParams()
  for (const name of ['code', 'state', 'error']) {
    const value = url.searchParams.get(name)
    if (value !== null) parameters.set(name, value)
  }
  window.history.replaceState(window.history.state, '', url.pathname)

  const result = await completeGoogleOAuth(parameters)

  switch (result.status) {
    case 'login': {
      const user = await getSession().catch(() => null)
      if (user) return getHomePath(user.role)
      return getLoginPath('error')
    }
    case 'linked':
      return '/settings'
    case 'cancelled':
      return result.flow === 'link' ? '/settings' : '/login'
    case 'not_linked':
    case 'session_expired':
      return getLoginPath(result.status)
    case 'already_linked':
      return getSettingsPath(result.status)
    default:
      return result.flow === 'link' ? getSettingsPath('error') : getLoginPath('error')
  }
}

export function useGoogleCallbackPage() {
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    void getCallbackDestination().then((destination) => window.location.replace(destination))
  }, [])
}
