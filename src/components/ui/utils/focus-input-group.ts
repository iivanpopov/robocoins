import type { MouseEvent } from 'react'

export function focusInputGroup(event: MouseEvent<HTMLElement>, container: HTMLElement | null) {
  if ((event.target as HTMLElement).closest('button')) return

  container?.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea')?.focus()
}
