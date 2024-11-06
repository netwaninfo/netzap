import { defineConfig, mergeConfig } from 'vitest/config'
import { config } from './vitest-default.config.mjs'

export default defineConfig(
  mergeConfig(config, {
    test: {
      globals: true,
      root: './',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  })
)
