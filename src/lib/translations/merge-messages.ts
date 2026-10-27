export function mergeMessages<Value>(catalogs: ReadonlyArray<Readonly<Record<string, Value>>>) {
  const messages: Record<string, Value> = {}

  for (const catalog of catalogs) {
    for (const [key, value] of Object.entries(catalog)) {
      if (Object.hasOwn(messages, key)) throw new Error(`Duplicate translation key: ${key}`)
      messages[key] = value
    }
  }

  return messages
}
