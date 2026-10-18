import { useRouteContext } from '@tanstack/react-router'

import { StudentProfileResponse } from '#/api/types'

export function useProfilePage() {
  const { user } = useRouteContext({ from: '__root__' })

  return {
    state: user as StudentProfileResponse,
  }
}
