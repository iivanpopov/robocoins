import path from 'node:path'

import { defineExtension } from '@kubb/core'

const SHIM = "export * from '#/lib/api-client'\n"

export const pluginThinClient = defineExtension({
  kind: 'plugin',
  meta: { name: 'plugin-thin-client' },
  dependencies: ['plugin-fetch'],
  hooks: {
    'kubb:build:end': async (context) => {
      const kubbDirectory = path.join(context.outputDir, '.kubb')
      await context.config.storage.writeItem(path.join(kubbDirectory, 'client.ts'), SHIM)
      await context.config.storage.removeItem(path.join(kubbDirectory, 'serializers.ts'))
      await context.config.storage.removeItem(path.join(kubbDirectory, 'standardSchema.ts'))
    },
  },
})
