import kanjou from '@kanjou/plugin/vite'
import { sentryTanstackStart } from '@sentry/tanstackstart-react/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import unocss from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      tsconfigPaths: true,
      dedupe: ['react', 'react-dom'],
    },
    plugins: [
      tanstackStart({
        router: {
          generatedRouteTree: '../generated/routeTree.gen.ts',
          tmpDir: './generated/.tanstack/tmp',
        },
      }),
      nitro({
        preset: 'vercel',
        routeRules: {
          '/api/**': {
            proxy: `${env.API_URL}/**`,
            headers: { 'Cache-Control': 'private, no-store' },
          },
        },
      }),
      kanjou(),
      react(),
      unocss(),
      sentryTanstackStart({
        tunnelRoute: true,
        bundleSizeOptimizations: {
          excludeDebugStatements: true,
          excludeTracing: true,
        },
        sourcemaps: {
          filesToDeleteAfterUpload: ['./dist/**/*.map', './.vercel/output/**/*.map'],
        },
      }),
    ],
    build: {
      sourcemap: 'hidden',
    },
  }
})
