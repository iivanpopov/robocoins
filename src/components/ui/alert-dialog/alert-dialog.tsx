import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { cn } from 'cn'
import type { ComponentProps } from 'react'

import { Button } from '../button'

import styles from './alert-dialog.module.css'

export function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root {...props} />
}

export function AlertDialogTrigger(props: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger {...props} />
}

export function AlertDialogPortal(props: AlertDialogPrimitive.Portal.Props) {
  return <AlertDialogPrimitive.Portal {...props} />
}

export function AlertDialogOverlay(props: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop {...props} className={cn(styles.overlay, props.className)} />
  )
}

export function AlertDialogContent(
  props: AlertDialogPrimitive.Popup.Props & { size?: 'default' | 'sm' },
) {
  const { size = 'default', ...popupProps } = props

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        {...popupProps}
        data-size={size}
        className={cn(styles.content, props.className)}
      />
    </AlertDialogPortal>
  )
}

export function AlertDialogHeader(props: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.header, props.className)} />
}

export function AlertDialogFooter(props: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.footer, props.className)} />
}

export function AlertDialogMedia(props: ComponentProps<'div'>) {
  return <div {...props} className={cn(styles.media, props.className)} />
}

export function AlertDialogTitle(props: AlertDialogPrimitive.Title.Props) {
  return <AlertDialogPrimitive.Title {...props} className={cn(styles.title, props.className)} />
}

export function AlertDialogDescription(props: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      {...props}
      className={cn(styles.description, props.className)}
    />
  )
}

export function AlertDialogAction(props: ComponentProps<typeof Button>) {
  return <Button {...props} />
}

export function AlertDialogCancel(
  props: AlertDialogPrimitive.Close.Props & Pick<ComponentProps<typeof Button>, 'variant' | 'size'>,
) {
  const { variant = 'ghost', size = 'md', ...closeProps } = props

  return (
    <AlertDialogPrimitive.Close {...closeProps} render={<Button variant={variant} size={size} />} />
  )
}
