import { useTranslate } from '@kanjou/react'
import { cn } from 'cn'

import { Button, Input } from '#/components/ui'

import type { RewardImagePickerModel } from '../../-hooks/use-reward-image-picker'

import styles from './reward-image-picker.module.css'

export interface RewardImagePickerProps {
  picker: RewardImagePickerModel
  disabled?: boolean
}

export function RewardImagePicker({ picker, disabled = false }: RewardImagePickerProps) {
  const t = useTranslate()

  function handleFileModeClick() {
    picker.functions.handleModeChange('file')
    picker.functions.handleChooseFile()
  }

  return (
    <section className={styles.picker}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('admin.catalog.image.title')}</h2>
        {picker.state.selection && (
          <span className={styles.badge}>{t('admin.catalog.image.unsaved')}</span>
        )}
      </div>
      <div className={styles.modes} role="tablist" aria-label={t('admin.catalog.image.title')}>
        <button
          type="button"
          role="tab"
          aria-selected={picker.state.mode === 'link'}
          className={cn(styles.mode, picker.state.mode === 'link' && styles['mode-active'])}
          disabled={disabled}
          onClick={() => picker.functions.handleModeChange('link')}
        >
          <span className="i-ph:link-bold" aria-hidden="true" />
          {t('admin.catalog.image.mode.link')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={picker.state.mode === 'file'}
          className={cn(styles.mode, picker.state.mode === 'file' && styles['mode-active'])}
          disabled={disabled}
          onClick={handleFileModeClick}
        >
          <span className="i-ph:upload-simple-bold" aria-hidden="true" />
          {t('admin.catalog.image.mode.file')}
        </button>
      </div>

      {picker.state.mode === 'link' && (
        <div className={styles.panel} role="tabpanel">
          <div className={styles['link-row']}>
            <Input
              ref={picker.refs.linkInput}
              value={picker.state.linkValue}
              disabled={disabled}
              inputMode="url"
              autoComplete="off"
              placeholder={t('admin.catalog.image.link.placeholder')}
              aria-invalid={!!picker.state.linkError}
              onChange={(event) => picker.functions.handleLinkValueChange(event.target.value)}
            />
            <Button
              type="button"
              size="sm"
              disabled={disabled || !picker.state.canApplyLink}
              onClick={picker.functions.handleApplyLink}
            >
              {t('action.show')}
            </Button>
          </div>
          {picker.state.linkError && (
            <p className={styles.error} role="alert">
              {t(picker.state.linkError)}
            </p>
          )}
        </div>
      )}

      <input
        ref={picker.refs.fileInput}
        type="file"
        accept="image/*"
        className={styles['file-input']}
        disabled={disabled}
        onChange={picker.functions.handleFileChange}
      />

      {picker.state.mode === 'file' && (
        <div className={styles.panel} role="tabpanel">
          <p className={styles.hint}>{t('admin.catalog.image.file.hint')}</p>
          {picker.state.fileError && (
            <p className={styles.error} role="alert">
              {t(picker.state.fileError)}
            </p>
          )}
        </div>
      )}

      {picker.state.selection && (
        <div className={styles.preview}>
          <div className={styles['preview-media']}>
            {!picker.state.isPreviewBroken && (
              <img
                src={picker.state.selection.url}
                alt=""
                onError={picker.functions.handlePreviewError}
              />
            )}
            {picker.state.isPreviewBroken && (
              <span className="i-ph:image-broken-duotone" aria-hidden="true" />
            )}
          </div>
          <div className={styles['preview-details']}>
            <span className={styles['preview-label']}>{t('admin.catalog.image.selected')}</span>
            {picker.state.selection.fileName && (
              <span className={styles['file-name']}>{picker.state.selection.fileName}</span>
            )}
            {!picker.state.selection.fileName && (
              <span className={styles['file-name']}>{picker.state.selection.url}</span>
            )}
            <div className={styles.actions}>
              {picker.state.selection.kind === 'link' && (
                <button
                  type="button"
                  className={styles.action}
                  disabled={disabled}
                  onClick={picker.functions.handleReplaceLink}
                >
                  {t('admin.catalog.image.link.replace')}
                </button>
              )}
              {picker.state.selection.kind === 'file' && (
                <button
                  type="button"
                  className={styles.action}
                  disabled={disabled}
                  onClick={picker.functions.handleChooseFile}
                >
                  {t('admin.catalog.image.file.replace')}
                </button>
              )}
              <button
                type="button"
                className={styles.action}
                disabled={disabled}
                onClick={picker.functions.handleRemove}
              >
                {t('action.delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      {picker.state.isPreviewBroken && (
        <p className={styles.error} role="alert">
          {t('admin.catalog.image.error.preview')}
        </p>
      )}
    </section>
  )
}
