import config from '@netzap/vitest-config/node'
import swc from 'unplugin-swc'
import { type UserConfig, defineConfig, mergeConfig } from 'vitest/config'

export default defineConfig(
  mergeConfig(config, {
    test: {
      include: ['**/*.e2e-spec.ts'],
      setupFiles: ['./test/setup/mongo-database-test.ts'],
    },
    plugins: [swc.vite()],
  } as UserConfig)
)
