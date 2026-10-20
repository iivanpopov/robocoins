import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { ResponseError } from '#/api/.kubb/client'
import { getCurrentUserAuthMeGet } from '#/api/clients/getCurrentUserAuthMeGet'

export const getSession = createIsomorphicFn()
  .server(async () => {
    if (!getRequest().headers.get('cookie')) return null

    const result = await getCurrentUserAuthMeGet({ throwOnError: false })
    if (result.response.status === 401) return null
    if (!result.response.ok || !result.data) throw new Error('Unable to load the current session')
    return result.data
  })
  .client(async () => {
    return getCurrentUserAuthMeGet()
      .unwrap()
      .catch((error) => {
        if (ResponseError.is(error) && error.status === 401) return null
        throw error
      })
  })
