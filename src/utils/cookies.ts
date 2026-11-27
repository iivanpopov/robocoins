export function readCookie(name: string) {
  const prefix = `${encodeURIComponent(name)}=`
  const cookie = document.cookie.split('; ').find((value) => value.startsWith(prefix))
  if (!cookie) return null

  const value = cookie.slice(prefix.length)
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
