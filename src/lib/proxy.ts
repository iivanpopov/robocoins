import { getRequest } from '@tanstack/react-start/server'

import { client } from '#/api/.kubb/client'

client.setConfig({
  baseURL: process.env.API_URL,
  options: { cache: 'no-store' },
})

client.interceptors.request.use((request) => {
  const currentRequest = getRequest()

  return {
    ...request,
    headers: {
      ...request.headers,
      cookie: currentRequest.headers.get('cookie') ?? '',
    },
    signal: currentRequest.signal,
  }
})
