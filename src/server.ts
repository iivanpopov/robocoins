import '#/lib/sentry'
import '#/lib/proxy'
import { wrapFetchWithSentry } from '@sentry/tanstackstart-react'
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

export default createServerEntry(
  wrapFetchWithSentry({
    async fetch(request: Request) {
      const target = `${request.method} ${new URL(request.url).pathname}`

      try {
        const response = await handler.fetch(request)
        if (response.status >= 500) {
          console.error(`[server] ${target} → ${response.status}`)
        }
        return response
      } catch (error) {
        console.error(
          `[server] ${target}`,
          error instanceof Error ? (error.stack ?? error.message) : String(error),
        )
        throw error
      }
    },
  }),
)
