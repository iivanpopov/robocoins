import { readCookie } from './cookies'

export const MOTION_PREFERENCE_COOKIE = 'reduced-motion'
const MOTION_PREFERENCE_EVENT = 'motion-preference-change'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function animationsDisabled() {
  return readCookie(MOTION_PREFERENCE_COOKIE) === 'true'
}

export function systemPrefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches
}

export function prefersReducedMotion() {
  return animationsDisabled() || systemPrefersReducedMotion()
}

export function setAnimationsDisabled(disabled: boolean) {
  document.cookie = `${MOTION_PREFERENCE_COOKIE}=${disabled}; Path=/; Max-Age=31536000; SameSite=Lax`
  window.dispatchEvent(new Event(MOTION_PREFERENCE_EVENT))
}

export function subscribeAnimationsDisabled(onChange: () => void) {
  window.addEventListener(MOTION_PREFERENCE_EVENT, onChange)
  return () => window.removeEventListener(MOTION_PREFERENCE_EVENT, onChange)
}

export function subscribeSystemReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}
