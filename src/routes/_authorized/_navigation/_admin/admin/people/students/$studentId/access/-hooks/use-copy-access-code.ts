import { useEffect, useRef, useState } from 'react'

const COPY_FEEDBACK_DURATION = 2000

export function useCopyAccessCode(code: string) {
  const [isCopied, setIsCopied] = useState(false)
  const [isCopyError, setIsCopyError] = useState(false)
  const timeoutReference = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutReference.current) clearTimeout(timeoutReference.current)
    }
  }, [])

  async function handleCopy() {
    if (!code) return

    try {
      await navigator.clipboard.writeText(code)
      setIsCopyError(false)
      setIsCopied(true)
      if (timeoutReference.current) clearTimeout(timeoutReference.current)
      timeoutReference.current = setTimeout(() => {
        setIsCopied(false)
        timeoutReference.current = null
      }, COPY_FEEDBACK_DURATION)
    } catch {
      setIsCopied(false)
      setIsCopyError(true)
    }
  }

  return {
    state: { isCopied, isCopyError },
    functions: { handleCopy },
  }
}
