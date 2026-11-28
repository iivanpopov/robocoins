interface ExpiringStorageEntry {
  value: unknown
  expiresAt: number
}

function isExpiringStorageEntry(value: unknown): value is ExpiringStorageEntry {
  return (
    typeof value === 'object' &&
    value !== null &&
    'value' in value &&
    'expiresAt' in value &&
    typeof value.expiresAt === 'number' &&
    Number.isFinite(value.expiresAt)
  )
}

export function readExpiringStorage(key: string): unknown {
  const raw = localStorage.getItem(key)
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isExpiringStorageEntry(parsed)) return null
    if (parsed.expiresAt <= Date.now()) {
      localStorage.removeItem(key)
      return null
    }
    return parsed.value
  } catch {
    return null
  }
}

export function writeExpiringStorage(key: string, value: unknown, ttlInMs: number) {
  const entry: ExpiringStorageEntry = {
    value,
    expiresAt: Date.now() + ttlInMs,
  }
  localStorage.setItem(key, JSON.stringify(entry))
}
