export function clampAchievementProgress(progressPercent: number) {
  if (!Number.isFinite(progressPercent)) return 0

  return Math.min(100, Math.max(0, progressPercent))
}
