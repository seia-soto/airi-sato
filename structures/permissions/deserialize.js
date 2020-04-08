const debug = require('./debug')
const flags = require('./flags')
const levels = require('./levels')

module.exports = () => {
  debug('deserializing permission levels')

  for (let i = 0, l = levels.length; i < l; i++) {
    debug(`deserialized '${levels[i]}' as '${1 << i}'`)

    flags[levels[i]] = 1 << i
  }
}
