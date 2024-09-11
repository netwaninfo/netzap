import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  bundle: false,
  clean: true,
  external: ['lightningcss'],
})
