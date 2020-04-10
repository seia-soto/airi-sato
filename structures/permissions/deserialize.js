const { permissions } = require('../../config')
const debug = require('./debug')
const levels = require('./levels')

module.exports = () => {
  debug('deserializing permission levels')

  for (let i = 0, l = permissions.length; i < l; i++) {
    debug(`assign flag '${1 << i}' to '${permissions[i].name}' permission node`)

    permissions[i].flag = 1 << i
    permissions[i].id = permissions[i].id || []
    permissions[i].permission = permissions[i].permission || []
    permissions[i].term = permissions[i].term || {}

    levels[permissions[i].name] = permissions[i]
  }
}
