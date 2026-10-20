import { useLayoutEffect, useRef } from 'react'

export function useCourseCardSizes(groups: unknown[]) {
  const containerReference = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerReference.current
    if (!container) return

    const details = container.querySelectorAll<HTMLElement>('[data-course-details]')

    function handleResize() {
      for (const element of details) {
        element.parentElement?.style.setProperty(
          '--category-icon-size',
          `${element.getBoundingClientRect().height}px`,
        )
      }
    }

    handleResize()
    const observer = new ResizeObserver(handleResize)
    for (const element of details) observer.observe(element)

    return () => observer.disconnect()
  }, [groups])

  return containerReference
}
