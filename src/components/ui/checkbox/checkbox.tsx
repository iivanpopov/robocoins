import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { cn } from 'cn'

import styles from './checkbox.module.css'

export interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  size?: 'md' | 'lg'
  variant?: 'error'
}

export function Checkbox({ size = 'md', variant, className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      data-slot="checkbox"
      data-variant={variant}
      className={cn(styles.checkbox, styles[size], className)}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={styles.indicator}>
        <span aria-hidden="true" className="i-ph:check" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
