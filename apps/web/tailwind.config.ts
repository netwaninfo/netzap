import type { Config } from 'tailwindcss'

import uiConfig from '@netzap/ui/tailwind.config'

const config: Config = {
  presets: [uiConfig],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        84: '21rem',
      },
    },
  },
}

export default config
