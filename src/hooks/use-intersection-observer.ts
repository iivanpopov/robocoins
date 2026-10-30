import { useEffect, useEffectEvent } from 'react'

import { useRefState } from './use-ref-state'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  enabled?: boolean
  onChange: IntersectionObserverCallback
}

export function useIntersectionObserver<Target extends Element>(
  options: UseIntersectionObserverOptions,
) {
  const ref = useRefState<Target | null>(null)
  const handleChange = useEffectEvent(options.onChange)

  useEffect(() => {
    if (options.enabled === false || !ref.state || typeof IntersectionObserver === 'undefined')
      return

    const observer = new IntersectionObserver(handleChange, {
      root: options.root,
      rootMargin: options.rootMargin,
      threshold: options.threshold,
    })
    observer.observe(ref.state)
    return () => observer.disconnect()
  }, [ref.state, options.enabled, options.root, options.rootMargin, options.threshold])

  return { ref }
}
