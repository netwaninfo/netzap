import config from '@netzap/vitest-config/node'
import { defineConfig, mergeConfig } from 'vitest/config'

export default defineConfig(mergeConfig(config, {}))
