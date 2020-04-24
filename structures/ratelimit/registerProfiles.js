const { ratelimit } = require('../../config')
const debug = require('./debug')
const profiles = require('./profiles')

module.exports = () => {
  const profileNames = Object.keys(ratelimit)

  debug('registering ratelimit profiles')

  for (let i = 0, l = profileNames.length; i < l; i++) {
    const profileName = profileNames[i]
    const profile = ratelimit[profileName]

    profiles[profileName] = profile
  }
}
