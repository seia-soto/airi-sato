const { ratelimit } = require('../../config')
const debug = require('./debug')
const profiles = require('./profiles')

module.exports = () => {
  const profileNames = Object.keys(ratelimit)

  for (let i = 0, l = profileNames.length; i < l; i++) {
    const profileName = profileNames[i]
    const profile = ratelimit[profileName]

    profiles[profileName] = profile

    debug(`registering new profile: ${profileNames[i]}`)
  }
}
