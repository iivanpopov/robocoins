type ClassArray = ClassValue[]
interface ClassDictionary {
  [id: string]: any
}
type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined

function resolve(value: ClassValue): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'bigint') return String(value)
  if (Array.isArray(value)) return value.map(resolve).filter(Boolean).join(' ')
  if (typeof value === 'object') {
    return Object.entries(value)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name)
      .join(' ')
  }

  return ''
}

export function cn(...inputs: ClassValue[]) {
  return inputs.map(resolve).filter(Boolean).join(' ')
}
