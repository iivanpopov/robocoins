import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { ValidationError } from '#/api/.kubb/standardSchema'
import { getCurrentUserAuthMeGet } from '#/api/clients/getCurrentUserAuthMeGet'

async function loadSession() {
  try {
    const result = await getCurrentUserAuthMeGet({ throwOnError: false })
    if (result.response.status === 401) return null
    if (!result.response.ok || !result.data) throw new Error('Unable to load the current session')
    return result.data
  } catch (error) {
    if (error instanceof ValidationError && error.status === 401) return null
    throw error
  }
}

export const getSession = createIsomorphicFn()
  .server(async () => {
    if (!getRequest().headers.get('cookie')) return null
    return loadSession()
  })
  .client(loadSession)
