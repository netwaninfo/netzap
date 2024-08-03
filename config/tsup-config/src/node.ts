import type { Options } from 'tsup'

const options: Options = {
	entry: ['src/**/*.ts'],
	format: ['esm'],
	dts: true,
	bundle: false,
	clean: true,
}

export default options
