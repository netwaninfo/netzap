import config from '@netzap/vitest-config/node'
import { type UserConfig, defineConfig, mergeConfig } from 'vitest/config'

export default defineConfig(
	mergeConfig(config, {
		test: {
			coverage: {
				enabled: true,
				provider: 'v8',
				reporter: ['text', 'json', 'html'],
			},
		},
	} as UserConfig),
)
