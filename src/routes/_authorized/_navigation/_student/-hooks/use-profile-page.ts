import { useRouteContext } from '@tanstack/react-router'

import { StudentProfileResponse } from '#/api/types'

export function useProfilePage() {
  const context = useRouteContext({ from: '/_authorized/_navigation/_student' })

  return {
    state: context.user as StudentProfileResponse,
  }
}
