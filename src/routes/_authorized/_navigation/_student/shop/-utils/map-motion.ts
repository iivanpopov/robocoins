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

export function advanceMapInertia(offset: Point, velocity: Point, elapsed: number) {
  const friction = Math.exp(-0.004 * elapsed)
  const distance = (1 - friction) / 0.004
  return {
    offset: { x: offset.x + velocity.x * distance, y: offset.y + velocity.y * distance },
    velocity: { x: velocity.x * friction, y: velocity.y * friction },
  }
}

export function interpolateMapOffset(offset: Point, target: Point, elapsed: number) {
  const weight = 1 - Math.exp(-Math.max(0, elapsed) / 18)
  const next = {
    x: offset.x + (target.x - offset.x) * weight,
    y: offset.y + (target.y - offset.y) * weight,
  }
  if (Math.hypot(target.x - next.x, target.y - next.y) < 0.1) return { ...target }
  return next
}
