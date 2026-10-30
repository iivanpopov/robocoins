import { useEffect, useRef, useState } from 'react'

const COPY_FEEDBACK_DURATION = 2000

export function useCopyAccessCode(code: string) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [copyErrorCode, setCopyErrorCode] = useState<string | null>(null)
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
      setCopyErrorCode(null)
      setCopiedCode(code)
      if (timeoutReference.current) clearTimeout(timeoutReference.current)
      timeoutReference.current = setTimeout(() => {
        setCopiedCode(null)
        timeoutReference.current = null
      }, COPY_FEEDBACK_DURATION)
    } catch {
      setCopiedCode(null)
      setCopyErrorCode(code)
    }
  }

  const isCopied = !!code && copiedCode === code
  const isCopyError = !!code && copyErrorCode === code

  return {
    state: { isCopied, isCopyError },
    functions: { handleCopy },
  }
}
