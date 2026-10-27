import type { CourseCategoryKey, RewardTypeKey } from '#/api/types'

export interface RewardDraft {
  name: string
  price: string
  description: string
  type: RewardTypeKey
  courseCategory: CourseCategoryKey | null
}

export type RewardDraftField = 'name' | 'price' | 'type' | 'courseCategory'

export type RewardDraftErrorKey =
  | 'admin.catalog.validation.name'
  | 'admin.catalog.validation.price'
  | 'admin.catalog.validation.type'
  | 'admin.catalog.validation.category'

export type RewardDraftErrors = Partial<Record<RewardDraftField, RewardDraftErrorKey>>

export type CatalogErrorKey =
  | 'admin.catalog.error.load'
  | 'admin.catalog.error.request'
  | 'error.session'
  | 'admin.catalog.error.forbidden'
  | 'admin.catalog.error.not-found'
  | 'admin.catalog.error.validation'
  | 'admin.catalog.create.error'

export type RewardImageErrorKey =
  | 'admin.catalog.image.error.link'
  | 'admin.catalog.image.error.file-type'
  | 'admin.catalog.image.error.file-size'

export type RewardImageMode = 'link' | 'file'

export interface RewardImageSelection {
  kind: RewardImageMode
  url: string
  fileName?: string
}

export type RewardActionNotice = 'hide' | 'show' | 'delete'
