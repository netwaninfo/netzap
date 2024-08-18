import type { Options } from 'tsup'

const options = {
	entry: ['src/**/*.ts'],
	format: ['cjs', 'esm'],
	dts: true,
	bundle: false,
	clean: true,
} satisfies Options

export default options
