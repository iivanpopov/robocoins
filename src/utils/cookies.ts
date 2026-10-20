import { createIsomorphicFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

export const readCookie = createIsomorphicFn()
  .server(async (name: string) => {
    return getCookie(name) ?? null
  })
  .client(async (name: string) => {
    const value = (await cookieStore.get(name))?.value
    if (!value) return null
    return decodeURIComponent(value)
  })
