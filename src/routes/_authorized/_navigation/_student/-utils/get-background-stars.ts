export function getBackgroundStars(count = 150) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (((i * 197.3 + Math.sin(i * 91.7) * 43) % 1000) + 1000) % 1000,
    y: (((i * 283.9 + Math.cos(i * 41.3) * 31) % 2000) + 2000) % 2000,
    radius: 2 + Number(i % 13 === 0) * 2,
    opacity: 0.15 + ((i * 17) % 70) / 125,
  }))
}
