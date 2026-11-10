import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginThinClient } from '@repo/kubb-thin-client'
import { defineConfig } from 'kubb/config'
import 'dotenv/config'

export default defineConfig({
  input: `${process.env.API_URL}/openapi.json`,
  output: { path: './generated/api', clean: true },
  plugins: [
    pluginTs(),
    pluginFetch({ baseURL: '/api' }),
    pluginReactQuery({ hooks: true }),
    pluginThinClient(),
  ],
})
