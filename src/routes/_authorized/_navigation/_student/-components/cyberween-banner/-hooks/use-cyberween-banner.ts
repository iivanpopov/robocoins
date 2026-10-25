import { useEffect, useState } from 'react'

const DISMISSED_YEAR_KEY = 'robocoins.cyberween.dismissed-year'

export function useCyberweenBanner(renderedAt: number) {
  const [dismissedYear, setDismissedYear] = useState<number | null>(null)

  useEffect(() => {
    const year = new Date(renderedAt).getUTCFullYear()

    try {
      if (window.localStorage.getItem(DISMISSED_YEAR_KEY) === String(year)) {
        setDismissedYear(year)
      }
    } catch {}
  }, [renderedAt])

  function handleDismiss() {
    const year = new Date(renderedAt).getUTCFullYear()

    setDismissedYear(year)

    try {
      window.localStorage.setItem(DISMISSED_YEAR_KEY, String(year))
    } catch {}
  }

  const date = new Date(renderedAt)
  const isVisible = date.getUTCMonth() === 9 && dismissedYear !== date.getUTCFullYear()

  return { isVisible, handleDismiss }
}
