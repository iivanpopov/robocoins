import { useTranslate } from '@kanjou/react'

import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle, Loader } from '#/components/ui'
import { AvatarPicker as TiledAvatarPicker, InlineError } from '#/routes/-components'
import { type Avatar as AvatarName } from '#/routes/-constants'

import styles from './avatar-picker.module.css'

export interface AvatarPickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: AvatarName
  name: string
  onSelect: (avatar: AvatarName) => void
  onSave: () => void
  isSaving: boolean
  isError: boolean
  onRetry: () => void
}

export function AvatarPicker(props: AvatarPickerProps) {
  const t = useTranslate()

  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange} showSwipeHandle>
      <DrawerContent>
        <div className={styles.layout}>
          <DrawerHeader>
            <DrawerTitle>{t('step.avatar.title')}</DrawerTitle>
          </DrawerHeader>
          <TiledAvatarPicker
            value={props.value}
            onChange={props.onSelect}
            name={props.name}
            disabled={props.isSaving}
          />
          {props.isError && (
            <InlineError onRetry={props.onRetry} isRetrying={props.isSaving}>
              {t('student.edit.avatar.error')}
            </InlineError>
          )}
          <Button
            variant="contain"
            onClick={props.onSave}
            disabled={props.isSaving}
            aria-busy={props.isSaving}
          >
            {props.isSaving && <Loader />}
            {t('action.save-avatar')}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
