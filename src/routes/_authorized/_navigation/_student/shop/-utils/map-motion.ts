type Point = { x: number; y: number }

export function getCameraProgress(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress))
  if (clamped < 0.5) return 4 * clamped ** 3
  return 1 - (-2 * clamped + 2) ** 3 / 2
}

export function getMapPosition(
  position: Point,
  offset: Point,
  size: { width: number; height: number },
) {
  return {
    x: (((position.x + (offset.x / (size.width || 1)) * 100) % 100) + 100) % 100,
    y: (((position.y + (offset.y / (size.height || 1)) * 100) % 100) + 100) % 100,
  }
}

export function getMapViewBox(camera: { x: number; y: number; zoom: number }) {
  return `${500 - (camera.x * 10 + 500) / camera.zoom} ${1000 - (camera.y * 20 + 1000) / camera.zoom} ${1000 / camera.zoom} ${2000 / camera.zoom}`
}

export function getPatternTransform(offset: Point, size: { width: number; height: number }) {
  return `translate(${(offset.x / size.width) * 160} ${(offset.y / size.height) * 320})`
}

export function advanceMapInertia(offset: Point, velocity: Point, elapsed: number) {
  const friction = Math.exp(-0.004 * elapsed)
  const distance = (1 - friction) / 0.004
  return {
    offset: { x: offset.x + velocity.x * distance, y: offset.y + velocity.y * distance },
    velocity: { x: velocity.x * friction, y: velocity.y * friction },
  }
}
