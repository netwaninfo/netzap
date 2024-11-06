import swc from 'unplugin-swc'
import { defineConfig, mergeConfig } from 'vitest/config'
import { config } from './vitest-default.config.mjs'

export default defineConfig(
  mergeConfig(config, {
    test: {
      include: ['**/*.e2e-spec.ts'],
      setupFiles: ['./test/setup/mongo-database-test.ts'],
    },
    plugins: [swc.vite()],
  })
)
