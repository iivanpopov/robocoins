import { useCallback, useLayoutEffect, useRef } from 'react'

import { getMapPosition, getMapViewBox, getPatternTransform, getStarPositions } from '../-utils'

type Star = ReturnType<typeof getStarPositions>[number] & { glow: number }

export function useMapAnimation(starsRef: React.RefObject<Star[]>) {
  const mapRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<SVGSVGElement>(null)
  const patternRef = useRef<SVGPatternElement>(null)
  const starElementsRef = useRef(new Map<number, HTMLButtonElement>())
  const offsetRef = useRef({ x: 0, y: 0 })
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1 })
  const sizeRef = useRef({ width: 0, height: 0 })
  const frameRef = useRef<number | null>(null)
  const labelMeasurementsRef = useRef(
    new WeakMap<HTMLElement, { width: number; height: number; text: string | null }>(),
  )

  const handleRender = useCallback(() => {
    frameRef.current = null
    const size = sizeRef.current
    if (!size.width || !size.height) return
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
    const labels: {
      element: HTMLElement
      distance: number
      left: number
      right: number
      top: number
      bottom: number
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
      element.style.setProperty('--scale', String(scale * camera.zoom))
      const measurement = measurements.get(star.reward.id)
      if (measurement) {
        const label = measurement.element
        labelElements.push(label)
        if (scale <= 0.48) continue
        const distanceFromCenter = Math.hypot((x / size.width) * 100, (y / size.height) * 200)
        const bottom = y - 13 * scale * camera.zoom - 14
        label.style.setProperty(
          '--label-opacity',
          String(0.45 + 0.55 * Math.exp(-((distanceFromCenter / 30) ** 2))),
        )
        labels.push({
          element: label,
          distance: distanceFromCenter,
          left: x - measurement.width / 2,
          right: x + measurement.width / 2,
          top: bottom - measurement.height,
          bottom,
        })
      }
    }

    const visibleLabels: typeof labels = []
    for (const label of labels.sort((first, second) => first.distance - second.distance)) {
      if (visibleLabels.length >= 3) break
      if (
        label.left < -size.width / 2 + 16 ||
        label.right > size.width / 2 - 16 ||
        label.top < -size.height / 2 + 16 ||
        label.bottom > size.height / 2 - 16
      )
        continue
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

    for (const element of labelElements) {
      const hidden = String(!visibleLabels.some((label) => label.element === element))
      if (element.getAttribute('aria-hidden') !== hidden)
        element.setAttribute('aria-hidden', hidden)
    }

    backgroundRef.current?.setAttribute('viewBox', getMapViewBox(camera))
    patternRef.current?.setAttribute('patternTransform', getPatternTransform(offset, size))
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
  }, [handleInvalidate])

  function handleGetPosition(star: Star) {
    return getMapPosition(star, offsetRef.current, sizeRef.current)
  }

  return {
    mapRef,
    backgroundRef,
    patternRef,
    starElementsRef,
    offsetRef,
    cameraRef,
    handleInvalidate,
    handleGetPosition,
  }
}
