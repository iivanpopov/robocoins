import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import type { ReactNode } from 'react'

import { Button } from '#/components/ui/button'

import styles from './toast.module.css'

const toast = ToastPrimitive.createToastManager()

export function Toast({ ...props }: ToastPrimitive.Root.Props) {
  return <ToastPrimitive.Root className={styles.toast} {...props} />
}

export function ToastContent({ ...props }: ToastPrimitive.Content.Props) {
  return <ToastPrimitive.Content className={styles.content} {...props} />
}

export function ToastTitle({ ...props }: ToastPrimitive.Title.Props) {
  return <ToastPrimitive.Title className={styles.title} {...props} />
}

export function ToastDescription({ ...props }: ToastPrimitive.Description.Props) {
  return <ToastPrimitive.Description className={styles.description} {...props} />
}

export function ToastClose({ children, ...props }: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      aria-label="Close toast"
      className={styles.close}
      render={<Button variant="ghost" size="sm" />}
      {...props}
    >
      {children ?? '×'}
    </ToastPrimitive.Close>
  )
}

function ToastList() {
  const manager = ToastPrimitive.useToastManager()

  return manager.toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <div className={styles.message}>
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastClose />
      </ToastContent>
    </Toast>
  ))
}

export function Toaster({ children }: { children: ReactNode }) {
  return (
    <ToastPrimitive.Provider toastManager={toast}>
      {children}
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport className={styles.viewport}>
          <ToastList />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  )
}

export { toast }
