type Point = { x: number; y: number }
type Size = { width: number; height: number }
type MapBounds = { minimum: Point; maximum: Point }

export function getMapBounds(positions: Point[], size: Size): MapBounds {
  if (!positions.length) return { minimum: { x: 0, y: 0 }, maximum: { x: 0, y: 0 } }
  const horizontal = positions.map((position) => ((position.x - 50) * 2 * size.width) / 100)
  const vertical = positions.map((position) => ((position.y - 50) * 2 * size.height) / 100)
  return {
    minimum: { x: -Math.max(...horizontal), y: -Math.max(...vertical) },
    maximum: { x: -Math.min(...horizontal), y: -Math.min(...vertical) },
  }
}

export function clampMapOffset(offset: Point, bounds: MapBounds) {
  return {
    x: Math.max(bounds.minimum.x, Math.min(bounds.maximum.x, offset.x)),
    y: Math.max(bounds.minimum.y, Math.min(bounds.maximum.y, offset.y)),
  }
}

export function getCameraProgress(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress))
  if (clamped < 0.5) return 4 * clamped ** 3
  return 1 - (-2 * clamped + 2) ** 3 / 2
}

export function getMapPosition(position: Point, offset: Point, size: Size) {
  return {
    x: (position.x - 50) * 2 + 50 + (offset.x / (size.width || 1)) * 100,
    y: (position.y - 50) * 2 + 50 + (offset.y / (size.height || 1)) * 100,
  }
}

export function advanceMapInertia(
  offset: Point,
  velocity: Point,
  elapsed: number,
  bounds: MapBounds,
) {
  const friction = Math.exp(-0.004 * elapsed)
  const distance = (1 - friction) / 0.004
  const target = { x: offset.x + velocity.x * distance, y: offset.y + velocity.y * distance }
  const clamped = clampMapOffset(target, bounds)
  const nextVelocity = { x: velocity.x * friction, y: velocity.y * friction }
  if (
    (clamped.x <= bounds.minimum.x && velocity.x < 0) ||
    (clamped.x >= bounds.maximum.x && velocity.x > 0)
  )
    nextVelocity.x = 0
  if (
    (clamped.y <= bounds.minimum.y && velocity.y < 0) ||
    (clamped.y >= bounds.maximum.y && velocity.y > 0)
  )
    nextVelocity.y = 0
  return {
    offset: clamped,
    velocity: nextVelocity,
  }
}
