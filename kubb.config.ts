import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'
import 'dotenv/config'

export default defineConfig([
  {
    name: 'api',
    input: `${process.env.API_URL}/openapi.json`,
    output: { path: './generated/api', clean: true },
    plugins: [pluginTs(), pluginFetch({ baseURL: '/api' }), pluginReactQuery({ hooks: true })],
  },
  {
    name: 'services',
    input: `${process.env.SERVICES_URL}/openapi`,
    output: { path: './generated/services', clean: true },
    plugins: [
      pluginTs(),
      pluginFetch({ baseURL: '/api/services' }),
      pluginReactQuery({ hooks: true }),
    ],
  },
])
