import { createIsomorphicFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

export function readDocumentCookie(name: string) {
  if (typeof document === 'undefined') return null
  const prefix = `${encodeURIComponent(name)}=`
  const cookie = document.cookie.split('; ').find((value) => value.startsWith(prefix))
  if (!cookie) return null
  return decodeURIComponent(cookie.slice(prefix.length))
}

export async function readClientCookie(name: string) {
  if (typeof document === 'undefined') return null
  if (typeof cookieStore !== 'undefined') {
    const cookie = await cookieStore.get(name)
    return cookie?.value ?? null
  }
  return readDocumentCookie(name)
}

export const readCookie = createIsomorphicFn()
  .server(async (name: string) => {
    return getCookie(name) ?? null
  })
  .client(async (name: string) => {
    return readClientCookie(name)
  })
