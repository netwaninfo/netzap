import tsConfigPaths from 'vite-tsconfig-paths'
import type { ViteUserConfig } from 'vitest/config'

export const config: ViteUserConfig = {
  test: {
    globals: true,
    root: './',
  },
  plugins: [tsConfigPaths()],
}
