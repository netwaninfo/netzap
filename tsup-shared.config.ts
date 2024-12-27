import type { Options } from 'tsup'

export const config: Options = {
  entry: ['src/**/*.ts'],
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
}
