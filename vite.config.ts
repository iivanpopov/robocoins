import kanjou from '@kanjou/plugin/vite'
import { sentryVitePlugin } from '@sentry/bundler-plugins/vite'
import { redact } from '@tanstack/redact/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import unocss from 'unocss/vite'
import { loadEnv } from 'vite'
import { defineConfig } from 'vite-plus'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'

  return {
    fmt: {
      semi: false,
      singleQuote: true,
      sortImports: true,
      ignorePatterns: ['generated/**'],
    },
    lint: {
      ignorePatterns: ['generated/**'],
      options: {
        typeAware: true,
        typeCheck: true,
      },
      plugins: ['react'],
      rules: {
        'react/exhaustive-deps': 'off',
        'react/refs': 'off',
      },
    },
    staged: {
      '*': 'vp check --fix',
    },
    resolve: {
      tsconfigPaths: true,
      dedupe: ['react', 'react-dom'],
    },
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: './src/routes',
        routeFileIgnorePrefix: '-',
        generatedRouteTree: './generated/routeTree.gen.ts',
        tmpDir: './generated/.tanstack/tmp',
      }),
      kanjou(),
      react(),
      redact({
        features: {
          activity: false,
          fragmentRefs: false,
        },
      }),
      unocss(),
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
      ...(isProduction
        ? [
            sentryVitePlugin({
              authToken: env.SENTRY_AUTH_TOKEN,
              org: env.SENTRY_ORG,
              project: env.SENTRY_PROJECT,
              bundleSizeOptimizations: {
                excludeDebugStatements: true,
                excludeTracing: true,
              },
              sourcemaps: {
                filesToDeleteAfterUpload: './dist/**/*.map',
              },
            }),
          ]
        : []),
    ],
    build: {
      sourcemap: isProduction ? 'hidden' : true,
      rolldownOptions: {
        checks: {
          moduleLevelDirective: false,
        },
      },
    },
    server: {
      proxy: env.API_URL
        ? {
            '^/api(?:/|\\?|$)': {
              target: env.API_URL,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api(?=\/|\?|$)\/?/, '/'),
              configure: (proxy) => {
                proxy.on('proxyRes', (response) => {
                  response.headers['cache-control'] = 'private, no-store'
                })
              },
            },
          }
        : undefined,
    },
  }
})
