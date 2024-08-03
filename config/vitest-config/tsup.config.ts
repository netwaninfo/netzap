import config from '@netzap/tsup-config/node'
import { defineConfig } from 'tsup'

export default defineConfig({
	...config,
	external: ['lightningcss'],
})
