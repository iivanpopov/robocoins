import { useTranslate } from '@kanjou/react'

import { GoogleIcon } from '#/components/google-icon'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Loader,
} from '#/components/ui'
import { InlineError } from '#/routes/-components'
import type { GoogleSettingsNotice } from '#/routes/-utils'

import { MaskedReadOnlyField } from '../masked-read-only-field'
import { useGoogleAccountSettings } from './hooks'

export function GoogleAccountSettings(props: {
  userId: number
  googleNotice?: GoogleSettingsNotice
}) {
  const settings = useGoogleAccountSettings(props.userId)
  const t = useTranslate()

  const link = settings.googleLink.data
  const isStatusLoading = settings.googleLink.isFetching && !link?.linked

  return (
    <>
      {settings.showNotice && props.googleNotice === 'already_linked' && (
        <InlineError>{t('settings.google.already-linked')}</InlineError>
      )}
      {((settings.showNotice && props.googleNotice === 'error') ||
        settings.startLinkMutation.isError) && (
        <InlineError>{t('settings.google.link-error')}</InlineError>
      )}
      {(settings.googleLink.isPending || (isStatusLoading && !settings.googleLink.isError)) && (
        <div role="status" className="flex items-center gap-2">
          <Loader />
          {t('settings.google.loading')}
        </div>
      )}
      {settings.googleLink.isError && (
        <div className="flex flex-wrap items-center gap-2">
          <InlineError>{t('settings.google.status-error')}</InlineError>
          <Button
            type="button"
            variant="link"
            onClick={settings.handleRetryStatus}
            disabled={settings.googleLink.isFetching}
            aria-busy={settings.googleLink.isFetching}
          >
            {t('settings.google.retry')}
          </Button>
        </div>
      )}
      {settings.googleLink.isSuccess && !isStatusLoading && !link?.linked && (
        <Button
          type="button"
          data-variant="light"
          className="w-full"
          disabled={settings.startLinkMutation.isPending}
          aria-busy={settings.startLinkMutation.isPending}
          onClick={settings.handleStartLink}
        >
          <GoogleIcon />
          {t('settings.google.add')}
        </Button>
      )}
      {(settings.googleLink.isSuccess || settings.isUnlinkOpen) && link?.linked && (
        <>
          {link.email && (
            <MaskedReadOnlyField
              key={link.email}
              id="settings-google-email"
              label={t('settings.google.email')}
              value={link.email}
              showLabel={t('settings.google.toggle-email')}
            />
          )}
          {!link.email && <p>{t('settings.google.connected')}</p>}
          <AlertDialog open={settings.isUnlinkOpen} onOpenChange={settings.handleUnlinkOpenChange}>
            <AlertDialogTrigger render={<Button variant="ghost" />}>
              {t('settings.google.unlink')}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('settings.google.unlink-title')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('settings.google.unlink-description')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              {settings.unlink.isError && (
                <InlineError>{t('settings.google.unlink-error')}</InlineError>
              )}
              <AlertDialogFooter>
                <AlertDialogCancel disabled={settings.unlink.isPending}>
                  {t('action.cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={settings.handleUnlink}
                  disabled={settings.unlink.isPending}
                  aria-busy={settings.unlink.isPending}
                >
                  {settings.unlink.isPending && <Loader />}
                  {t('settings.google.unlink-confirm')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  )
}
