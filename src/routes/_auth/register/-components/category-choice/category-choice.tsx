import { cn } from 'cn'
import type { ComponentProps } from 'react'

import type { CourseCategoryKey } from '#/api/types'

import styles from './category-choice.module.css'

export interface CategoryChoiceProps extends ComponentProps<'button'> {
  category?: CourseCategoryKey
}

export function CategoryChoice({
  category,
  className,
  type = 'button',
  ...props
}: CategoryChoiceProps) {
  return (
    <button
      {...props}
      type={type}
      data-category={category}
      className={cn(styles.choice, className)}
    />
  )
}

export interface CategoryChoiceTileProps extends ComponentProps<'div'> {}

export function CategoryChoiceTile({ className, ...props }: CategoryChoiceTileProps) {
  return <div {...props} className={cn(styles.tile, className)} />
}
