export function getTabViewTransition(
  currentIndex: number,
  nextIndex: number,
): false | { types: Array<'slide-forward' | 'slide-backward'> } {
  if (currentIndex === -1 || nextIndex === -1 || currentIndex === nextIndex) return false
  if (nextIndex > currentIndex) return { types: ['slide-forward'] }
  return { types: ['slide-backward'] }
}
