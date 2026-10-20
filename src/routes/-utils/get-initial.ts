import { UKRAINIAN_LOCALE } from '../-constants'

export function getInitial(name: string) {
  return name.trim().charAt(0).toLocaleUpperCase(UKRAINIAN_LOCALE)
}
