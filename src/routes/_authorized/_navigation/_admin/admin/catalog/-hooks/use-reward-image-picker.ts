import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import * as v from 'valibot'

import { RewardImageLinkSchema } from '../-schemas'
import type { RewardImageErrorKey, RewardImageMode, RewardImageSelection } from '../-types'

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const IMAGE_TYPE_PREFIX = 'image/'

export function useRewardImagePicker() {
  const fileInput = useRef<HTMLInputElement>(null)
  const linkInput = useRef<HTMLInputElement>(null)
  const objectUrl = useRef<string | null>(null)

  const [mode, setMode] = useState<RewardImageMode>('link')
  const [linkValue, setLinkValue] = useState('')
  const [selection, setSelection] = useState<RewardImageSelection | null>(null)
  const [linkError, setLinkError] = useState<RewardImageErrorKey | null>(null)
  const [fileError, setFileError] = useState<RewardImageErrorKey | null>(null)
  const [isPreviewBroken, setIsPreviewBroken] = useState(false)

  useEffect(() => {
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current)
    }
  }, [])

  function revokeObjectUrl() {
    if (!objectUrl.current) return
    URL.revokeObjectURL(objectUrl.current)
    objectUrl.current = null
  }

  function clearSelection() {
    revokeObjectUrl()
    setSelection(null)
    setIsPreviewBroken(false)
  }

  function handleModeChange(nextMode: RewardImageMode) {
    if (nextMode === mode) return
    clearSelection()
    setMode(nextMode)
    setLinkError(null)
    setFileError(null)
  }

  function handleLinkValueChange(value: string) {
    setLinkValue(value)
    setLinkError(null)
    if (selection?.kind !== 'link') return

    setSelection(null)
    setIsPreviewBroken(false)
  }

  function handleApplyLink() {
    const result = v.safeParse(RewardImageLinkSchema, linkValue)
    if (!result.success) {
      setLinkError('admin.catalog.image.error.link')
      return
    }

    revokeObjectUrl()
    setSelection({ kind: 'link', url: result.output })
    setLinkError(null)
    setIsPreviewBroken(false)
  }

  function handleChooseFile() {
    fileInput.current?.click()
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!file.type.startsWith(IMAGE_TYPE_PREFIX)) {
      setFileError('admin.catalog.image.error.file-type')
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setFileError('admin.catalog.image.error.file-size')
      return
    }

    revokeObjectUrl()
    const url = URL.createObjectURL(file)
    objectUrl.current = url
    setSelection({ kind: 'file', url, fileName: file.name })
    setFileError(null)
    setIsPreviewBroken(false)
  }

  function handleReplaceLink() {
    clearSelection()
    setLinkError(null)
    linkInput.current?.focus()
  }

  function handleRemove() {
    clearSelection()
    setLinkValue('')
    setLinkError(null)
    setFileError(null)
  }

  function handlePreviewError() {
    setIsPreviewBroken(true)
  }

  return {
    refs: {
      fileInput,
      linkInput,
    },
    state: {
      mode,
      linkValue,
      selection,
      linkError,
      fileError,
      isPreviewBroken,
      canApplyLink: !!linkValue.trim(),
    },
    functions: {
      handleModeChange,
      handleLinkValueChange,
      handleApplyLink,
      handleChooseFile,
      handleFileChange,
      handleReplaceLink,
      handleRemove,
      handlePreviewError,
    },
  }
}

export type RewardImagePickerModel = ReturnType<typeof useRewardImagePicker>
