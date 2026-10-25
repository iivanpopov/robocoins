import { readClientCookie } from './cookies'

export const MOTION_PREFERENCE_COOKIE = 'reduced-motion'
export const MOTION_PREFERENCE_EVENT = 'motion-preference-change'

export function animationsDisabled() {
  return readClientCookie(MOTION_PREFERENCE_COOKIE) === 'true'
}

export function systemPrefersReducedMotion() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function prefersReducedMotion() {
  return animationsDisabled() || systemPrefersReducedMotion()
}

export function setAnimationsDisabled(disabled: boolean) {
  document.cookie = `${MOTION_PREFERENCE_COOKIE}=${disabled}; Path=/; Max-Age=31536000; SameSite=Lax`
  document.documentElement.dataset.reducedMotion = String(disabled)
  window.dispatchEvent(new Event(MOTION_PREFERENCE_EVENT))
}

export function subscribeMotionPreference(onChange: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', onChange)
  window.addEventListener(MOTION_PREFERENCE_EVENT, onChange)
  window.addEventListener('focus', onChange)
  window.cookieStore?.addEventListener('change', onChange)
  return () => {
    media.removeEventListener('change', onChange)
    window.removeEventListener(MOTION_PREFERENCE_EVENT, onChange)
    window.removeEventListener('focus', onChange)
    window.cookieStore?.removeEventListener('change', onChange)
  }
}
