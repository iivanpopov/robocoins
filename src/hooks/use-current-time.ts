import { useEffect, useState } from 'react'

export function useCurrentTime(initialTime: number) {
  const [now, setNow] = useState(initialTime)

  useEffect(() => {
    const minuteInMilliseconds = 60_000
    let timeout: ReturnType<typeof setTimeout>

    function handleClockUpdate() {
      clearTimeout(timeout)
      setNow(Date.now())
      timeout = setTimeout(
        handleClockUpdate,
        minuteInMilliseconds - (Date.now() % minuteInMilliseconds),
      )
    }

    handleClockUpdate()
    window.addEventListener('focus', handleClockUpdate)
    document.addEventListener('visibilitychange', handleClockUpdate)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('focus', handleClockUpdate)
      document.removeEventListener('visibilitychange', handleClockUpdate)
    }
  }, [initialTime])

  return now
}
