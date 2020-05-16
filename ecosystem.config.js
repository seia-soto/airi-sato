module.exports = {
  apps: [
    {
      name: 'airi-sato',
      script: './index.js',
      env: {
        DEBUG: '*'
      },
      env_production: {
        DEBUG: 'airi-sato*'
      }
    }
  ]
}
