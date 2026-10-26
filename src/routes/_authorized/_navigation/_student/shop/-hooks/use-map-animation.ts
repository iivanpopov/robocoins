import { useCallback, useLayoutEffect, useRef } from 'react'

import { clampMapOffset, getMapBounds, getMapPosition, getStarPositions } from '../-utils'

type Star = ReturnType<typeof getStarPositions>[number] & { glow: number }

export function useMapAnimation(starsRef: React.RefObject<Star[]>) {
  const mapRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<SVGSVGElement>(null)
  const starElementsRef = useRef(new Map<number, HTMLButtonElement>())
  const offsetRef = useRef({ x: 0, y: 0 })
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1 })
  const sizeRef = useRef({ width: 0, height: 0 })
  const boundsRef = useRef(getMapBounds([], sizeRef.current))
  const frameRef = useRef<number | null>(null)
  const labelMeasurementsRef = useRef(
    new WeakMap<HTMLElement, { width: number; height: number; text: string | null }>(),
  )

  const handleRender = useCallback(() => {
    frameRef.current = null
    const size = sizeRef.current
    if (!size.width || !size.height) return
    boundsRef.current = getMapBounds(starsRef.current, size)
    offsetRef.current = clampMapOffset(offsetRef.current, boundsRef.current)
    const camera = cameraRef.current
    const offset = offsetRef.current
    const measurements = new Map<number, { element: HTMLElement; width: number; height: number }>()
    for (const star of starsRef.current) {
      const label = starElementsRef.current
        .get(star.reward.id)
        ?.querySelector<HTMLElement>('[data-star-label]')
      if (label) {
        let measurement = labelMeasurementsRef.current.get(label)
        if (!measurement || measurement.text !== label.textContent) {
          measurement = {
            width: label.offsetWidth,
            height: label.offsetHeight,
            text: label.textContent,
          }
          labelMeasurementsRef.current.set(label, measurement)
        }
        measurements.set(star.reward.id, {
          element: label,
          width: measurement.width,
          height: measurement.height,
        })
      }
    }
    const labelElements: HTMLElement[] = []
    const visuals: {
      element: HTMLButtonElement
      left: number
      right: number
      top: number
      bottom: number
    }[] = []
    const labels: {
      element: HTMLElement
      owner: HTMLButtonElement
      distance: number
      left: number
      right: number
      top: number
      bottom: number
      translate: number
      translateX: number
      opacity: number
      x: number
      y: number
    }[] = []

    for (const star of starsRef.current) {
      const element = starElementsRef.current.get(star.reward.id)
      if (!element) continue
      const position = getMapPosition(star, offset, size)
      const distance = Math.hypot(position.x - 50, (position.y - 50) * 2)
      const minimumScale = 12 / 26
      const scale = minimumScale + (1.8 - minimumScale) * Math.exp(-((distance / 30) ** 2))
      const x = (((position.x - 50) * camera.zoom + camera.x) * size.width) / 100
      const y = (((position.y - 50) * camera.zoom + camera.y) * size.height) / 100
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      element.style.visibility = 'visible'
      const visualSize = Math.round(26 * scale * camera.zoom)
      element.style.setProperty('--star-size', `${visualSize}px`)
      const near = String(scale >= 1)
      if (element.dataset.near !== near) element.dataset.near = near
      visuals.push({
        element,
        left: x - visualSize / 2,
        right: x + visualSize / 2,
        top: y - visualSize / 2,
        bottom: y + visualSize / 2,
      })
      const measurement = measurements.get(star.reward.id)
      if (measurement) {
        const label = measurement.element
        labelElements.push(label)
        if (scale <= 0.48) continue
        const distanceFromCenter = Math.hypot(x, y)
        const relativeDistance = (distanceFromCenter / size.width) * 100
        const left = Math.max(
          -size.width / 2 + 16,
          Math.min(x - measurement.width / 2, size.width / 2 - 16 - measurement.width),
        )
        for (const translate of [-visualSize / 2 - 14, visualSize / 2 + 14 + measurement.height]) {
          const bottom = y + translate
          labels.push({
            element: label,
            owner: element,
            distance: distanceFromCenter,
            left,
            right: left + measurement.width,
            top: bottom - measurement.height,
            bottom,
            translate,
            translateX: left - x,
            opacity: 0.45 + 0.55 * Math.exp(-((relativeDistance / 30) ** 2)),
            x,
            y,
          })
        }
      }
    }

    function getObstructions(label: (typeof labels)[number]) {
      return visuals.filter(
        (visual) =>
          label.left < visual.right + 8 &&
          label.right + 8 > visual.left &&
          label.top < visual.bottom + 8 &&
          label.bottom + 8 > visual.top,
      )
    }

    const candidates = labels
      .filter(
        (label) =>
          Math.abs(label.x) <= size.width / 2 &&
          Math.abs(label.y) <= size.height / 2 &&
          label.top >= -size.height / 2 + 80 &&
          label.bottom <= size.height / 2 - 130,
      )
      .sort((first, second) => first.distance - second.distance)
    const priority = candidates
      .filter((label) => label.element === candidates[0]?.element)
      .sort((first, second) => getObstructions(first).length - getObstructions(second).length)[0]
    const obscuredVisuals = new Set<HTMLButtonElement>()
    const visibleLabels: typeof labels = []

    if (priority) {
      visibleLabels.push(priority)
      for (const visual of getObstructions(priority)) obscuredVisuals.add(visual.element)
    }

    for (const label of candidates) {
      if (visibleLabels.length >= 3) break
      if (obscuredVisuals.has(label.owner)) continue
      if (visibleLabels.some((visible) => visible.element === label.element)) continue
      if (getObstructions(label).some((visual) => !obscuredVisuals.has(visual.element))) continue
      if (
        visibleLabels.some(
          (visible) =>
            label.left < visible.right + 16 &&
            label.right + 16 > visible.left &&
            label.top < visible.bottom + 12 &&
            label.bottom + 12 > visible.top,
        )
      )
        continue
      visibleLabels.push(label)
    }

    for (const visual of visuals) {
      const obscured = obscuredVisuals.has(visual.element)
      visual.element.style.setProperty('--marker-opacity', String(Number(!obscured)))
      visual.element.style.zIndex = String(Number(visual.element === priority?.owner))
      visual.element.style.pointerEvents = 'auto'
      if (obscured) visual.element.style.pointerEvents = 'none'
    }

    for (const element of labelElements) {
      const hidden = String(!visibleLabels.some((label) => label.element === element))
      if (element.getAttribute('aria-hidden') !== hidden)
        element.setAttribute('aria-hidden', hidden)
    }

    for (const label of visibleLabels) {
      label.element.style.translate = `${label.translateX}px ${label.translate}px`
      label.element.style.setProperty('--label-opacity', String(label.opacity))
    }

    if (backgroundRef.current) {
      const backgroundX = offset.x * 0.16
      const backgroundY = offset.y * 0.16
      backgroundRef.current.style.transform = `translate3d(${(camera.x * size.width) / 100 + backgroundX * camera.zoom}px, ${(camera.y * size.height) / 100 + backgroundY * camera.zoom}px, 0) scale(${camera.zoom})`
    }
  }, [starsRef])

  const handleInvalidate = useCallback(() => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(handleRender)
  }, [handleRender])

  useLayoutEffect(() => {
    const map = mapRef.current
    if (!map) return
    function handleResize() {
      if (!map) return
      labelMeasurementsRef.current = new WeakMap()
      const previousSize = sizeRef.current
      if (previousSize.width && previousSize.height) {
        offsetRef.current = {
          x: (offsetRef.current.x * map.clientWidth) / previousSize.width,
          y: (offsetRef.current.y * map.clientHeight) / previousSize.height,
        }
      }
      sizeRef.current = { width: map.clientWidth, height: map.clientHeight }
      boundsRef.current = getMapBounds(starsRef.current, sizeRef.current)
      offsetRef.current = clampMapOffset(offsetRef.current, boundsRef.current)
      handleInvalidate()
    }
    handleResize()
    const observer = new ResizeObserver(handleResize)
    observer.observe(map)
    document.fonts.addEventListener('loadingdone', handleResize)
    return () => {
      observer.disconnect()
      document.fonts.removeEventListener('loadingdone', handleResize)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [handleInvalidate, starsRef])

  useLayoutEffect(() => {
    handleInvalidate()
  })

  function handleFocusStar(star: Star) {
    const size = sizeRef.current
    if (!size.width || !size.height) return
    const position = getMapPosition(star, offsetRef.current, size)
    if (position.x >= 10 && position.x <= 90 && position.y >= 25 && position.y <= 75) return
    offsetRef.current = clampMapOffset(
      {
        x: offsetRef.current.x + ((50 - position.x) * size.width) / 100,
        y: offsetRef.current.y + ((50 - position.y) * size.height) / 100,
      },
      getMapBounds(starsRef.current, size),
    )
    handleInvalidate()
  }

  function handleGetPosition(star: Star) {
    return getMapPosition(star, offsetRef.current, sizeRef.current)
  }

  return {
    mapRef,
    backgroundRef,
    starElementsRef,
    offsetRef,
    boundsRef,
    cameraRef,
    handleInvalidate,
    handleGetPosition,
    handleFocusStar,
  }
}
