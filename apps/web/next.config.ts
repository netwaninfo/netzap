import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/wa',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
