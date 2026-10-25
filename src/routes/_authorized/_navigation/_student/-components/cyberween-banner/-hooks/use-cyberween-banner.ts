import { useSyncExternalStore } from 'react'

const DISMISSED_YEAR_KEY = 'robocoins.cyberween.dismissed-year'
const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)

  return () => {
    listeners.delete(onChange)
  }
}

function handleChange() {
  for (const listener of listeners) listener()
}

function getDismissedYear() {
  try {
    const value = Number(window.localStorage.getItem(DISMISSED_YEAR_KEY))
    return Number.isSafeInteger(value) && value > 0 ? value : null
  } catch {
    return null
  }
}

export function useCyberweenBanner(renderedAt: number) {
  const dismissedYear = useSyncExternalStore(subscribe, getDismissedYear, () => null)

  function handleDismiss() {
    const year = new Date(renderedAt).getUTCFullYear()

    try {
      window.localStorage.setItem(DISMISSED_YEAR_KEY, String(year))
    } catch {}
    handleChange()
  }

  const date = new Date(renderedAt)
  const isVisible = date.getUTCMonth() === 9 && dismissedYear !== date.getUTCFullYear()

  return { isVisible, handleDismiss }
}
