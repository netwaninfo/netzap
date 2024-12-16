module.exports = {
  apps: [
    {
      name: 'netzap-backend-v2',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
