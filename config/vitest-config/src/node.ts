import tsConfigPaths from 'vite-tsconfig-paths'
import type { UserConfig } from 'vitest/config'

const config: UserConfig = {
  test: {
    globals: true,
    root: './',
  },
  plugins: [tsConfigPaths()],
}

export default config
