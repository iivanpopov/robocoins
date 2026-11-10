import { readdirSync } from 'node:fs'
import path from 'node:path'

import { Generator, getConfig } from '@kanjou/generator'
import type { Plugin } from 'vite'

const VIRTUAL_PREFIX = 'virtual:messages/'
const RESOLVED_PREFIX = '\0virtual:messages/'

export function translationNamespaces(): Plugin {
  const config = getConfig()

  return {
    name: 'translation-namespaces',
    resolveId(id) {
      if (id.startsWith(VIRTUAL_PREFIX)) return `\0${id}`
    },
    async load(id) {
      if (!id.startsWith(RESOLVED_PREFIX)) return

      const target = id.slice(RESOLVED_PREFIX.length).split('/')
      const locale = target[0]
      const namespace = target[1]
      if (target.length !== 2 || !locale || !namespace || !/^[\w-]+$/.test(locale + namespace)) {
        return this.error('Invalid translation namespace')
      }

      const localesDirectory = path.resolve(config.localesDir, locale)
      const generator = new Generator(getConfig({ localesDir: localesDirectory, dts: false }))
      const namespaceModule = await generator.virtual(namespace)
      if (!namespaceModule)
        return this.error(`Translation namespace not found: ${target.join('/')}`)

      const files = readdirSync(localesDirectory, { recursive: true, withFileTypes: true })
      for (const file of files) {
        if (file.isFile() && /\.[cm]?[jt]s$/.test(file.name)) {
          this.addWatchFile(path.join(file.parentPath, file.name))
        }
      }

      return namespaceModule.code
    },
  }
}
