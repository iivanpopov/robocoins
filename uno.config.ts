import { defineConfig, presetIcons, presetMini } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons(),
    presetMini({
      preflight: false,
    }),
  ],
})
