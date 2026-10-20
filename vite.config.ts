import kanjou from '@kanjou/plugin/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const { API_URL, SERVICES_URL } = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      tsconfigPaths: true,
      dedupe: ['react', 'react-dom'],
    },
    server: {
      proxy: {
        '/api/services': {
          target: SERVICES_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/services/, ''),
        },
        '/api': {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        generatedRouteTree: './generated/routeTree.gen.ts',
        tmpDir: './generated/.tanstack/tmp',
      }),
      kanjou(),
      react(),
      unocss(),
      sentryVitePlugin({
        sourcemaps: {
          filesToDeleteAfterUpload: ['./dist/**/*.map'],
        },
      }),
    ],
    build: {
      sourcemap: 'hidden',
    },
  }
})
