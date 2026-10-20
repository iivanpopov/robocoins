import type { Avatar } from '../-constants'

const IMAGE_DIRECTORIES = {
  avatar: 'avatar',
  product: 'products',
} as const

export function getAvatarUrl(avatar: Avatar) {
  return getImageUrl('avatar', avatar)
}

export function getProductUrl(product: string) {
  return getImageUrl('product', product)
}

function getImageUrl(directory: keyof typeof IMAGE_DIRECTORIES, name: string) {
  return `/images/${IMAGE_DIRECTORIES[directory]}/${name}.webp`
}
