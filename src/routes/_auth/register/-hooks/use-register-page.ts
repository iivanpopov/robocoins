import { useSearch } from '@tanstack/react-router'

export function useRegisterPage() {
  const search = useSearch({ from: '/_auth/register' })

  return { state: { step: search.step } }
}
