import { cn } from 'cn'
import type { ReactNode } from 'react'

import styles from './visual-picker.module.css'

export type VisualPickerLayout = 'avatar' | 'effect'

export interface VisualPickerGridProps {
  label: string
  layout?: VisualPickerLayout
  className?: string
  children: ReactNode
}

export function VisualPickerGrid(props: VisualPickerGridProps) {
  const layout = props.layout ?? 'effect'

  return (
    <div
      role="group"
      aria-label={props.label}
      data-layout={layout}
      className={cn(styles.grid, props.className)}
    >
      {props.children}
    </div>
  )
}

export interface VisualPickerTileProps {
  label: string
  layout?: VisualPickerLayout
  isSelected?: boolean
  isLocked?: boolean
  disabled?: boolean
  status?: ReactNode
  children: ReactNode
  onClick?: () => void
}

export function VisualPickerTile(props: VisualPickerTileProps) {
  const layout = props.layout ?? 'effect'

  const content = (
    <>
      <span className={styles.media}>{props.children}</span>
      {layout !== 'avatar' && <span className={styles.label}>{props.label}</span>}
      {props.status && <span className={styles.status}>{props.status}</span>}
    </>
  )

  if (props.isLocked) {
    return (
      <div className={styles.tile} data-layout={layout} data-locked="true" aria-disabled="true">
        {content}
      </div>
    )
  }

  return (
    <button
      type="button"
      className={styles.tile}
      data-layout={layout}
      data-selected={props.isSelected || undefined}
      aria-pressed={props.isSelected}
      aria-label={props.label}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {content}
    </button>
  )
}
