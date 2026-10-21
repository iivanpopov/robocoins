import kanjou from '@kanjou/plugin/vite'
import { sentryTanstackStart } from '@sentry/tanstackstart-react/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import unocss from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isVercelPreview = process.env.VERCEL_ENV === 'preview'
  const sourcemap = isVercelPreview ? true : 'hidden'

  return {
    define: {
      'import.meta.env.VITE_SENTRY_DSN': JSON.stringify(isVercelPreview ? '' : env.VITE_SENTRY_DSN),
    },
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
        sourcemap: true,
        traceDeps: ['react', 'react-dom'],
        rolldownConfig: {
          external: ['react', 'react-dom'],
          checks: {
            moduleLevelDirective: false,
          },
        },
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
      ...(!isVercelPreview
        ? [
            sentryTanstackStart({
              authToken: env.SENTRY_AUTH_TOKEN,
              bundleSizeOptimizations: {
                excludeDebugStatements: true,
                excludeTracing: true,
              },
              sourcemaps: {
                filesToDeleteAfterUpload: ['./dist/**/*.map', './.vercel/output/**/*.map'],
              },
            }),
          ]
        : []),
      ...(mode === 'analyze'
        ? [
            visualizer({
              filename: './dist/bundle-analysis.html',
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
    build: {
      sourcemap,
      rolldownOptions: {
        checks: {
          moduleLevelDirective: false,
        },
      },
    },
    environments: {
      ssr: {
        build: {
          sourcemap,
          rolldownOptions: {
            checks: {
              moduleLevelDirective: false,
            },
          },
        },
      },
    },
    ssr: {
      external: ['react', 'react-dom'],
    },
  }
})
