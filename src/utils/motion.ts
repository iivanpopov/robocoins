export const MOTION_PREFERENCE_STORAGE_KEY = 'reduced-motion'
const MOTION_PREFERENCE_EVENT = 'motion-preference-change'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function animationsDisabled() {
  return localStorage.getItem(MOTION_PREFERENCE_STORAGE_KEY) === 'true'
}

export function systemPrefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

export function prefersReducedMotion() {
  return animationsDisabled() || systemPrefersReducedMotion()
}

export function setAnimationsDisabled(disabled: boolean) {
  localStorage.setItem(MOTION_PREFERENCE_STORAGE_KEY, String(disabled))
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
