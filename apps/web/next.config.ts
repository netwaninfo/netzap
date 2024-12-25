import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@netzap/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
