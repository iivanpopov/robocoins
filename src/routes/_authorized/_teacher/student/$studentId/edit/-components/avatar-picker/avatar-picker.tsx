import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import { AVATARS, type Avatar as AvatarName } from '#/routes/-constants'
import { getAvatarUrl, getInitial } from '#/routes/-utils'

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
          <div className={styles.grid}>
            {AVATARS.map((avatar) => (
              <button
                key={avatar}
                type="button"
                className={cn(styles.option, avatar === props.value && styles['option-selected'])}
                onClick={() => props.onSelect(avatar)}
                aria-pressed={avatar === props.value}
                title={avatar}
              >
                <Avatar size="lg">
                  <AvatarImage src={getAvatarUrl(avatar)} alt="" aria-hidden="true" />
                  <AvatarFallback role="img" aria-label={props.name}>
                    {getInitial(props.name)}
                  </AvatarFallback>
                </Avatar>
              </button>
            ))}
          </div>
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
