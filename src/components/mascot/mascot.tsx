import { cn } from 'cn'
import { ImgHTMLAttributes } from 'react'

import styles from './mascot.module.css'

export type MascotMood =
  | 'neutral'
  | 'happy'
  | 'support'
  | 'curious'
  | 'explaining'
  | 'thinking'
  | 'error'
  | 'moving'
  | 'thank-you'
  | 'celebrate'

export const MASCOT_MOODS = [
  'neutral',
  'happy',
  'support',
  'curious',
  'explaining',
  'thinking',
  'error',
  'moving',
  'thank-you',
  'celebrate',
] as const satisfies readonly MascotMood[]

export const MASCOT_SIZES = [320, 640, 960, 1254] as const
export type MascotSize = (typeof MASCOT_SIZES)[number]

const MAX_MASCOT_SIZE = 1254

export interface MascotProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  mood?: MascotMood
  size?: number
}

export function getMascotSrcSet(mood: MascotMood) {
  return MASCOT_SIZES.map((width) => `/mascot/${mood}/${mood}-${width}.webp ${width}w`).join(', ')
}

export function Mascot({ mood = 'neutral', size, className, ...props }: MascotProps) {
  return (
    <img
      {...props}
      src={`/mascot/${mood}/${mood}-${MAX_MASCOT_SIZE}.webp`}
      srcSet={getMascotSrcSet(mood)}
      sizes={size ? `${size}px` : undefined}
      width={MAX_MASCOT_SIZE}
      draggable={false}
      data-slot="mascot"
      data-mood={mood}
      className={cn(styles.mascot, className)}
    />
  )
}
