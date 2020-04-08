const { permissions } = require('../../config')
const debug = require('./debug')
const levels = require('./levels')

module.exports = () => {
  debug('deserializing permission levels')

  for (let i = 0, l = permissions.length; i < l; i++) {
    debug(`assign flag '${1 << i}' to '${permissions[i].name}'`)

    permissions[i].flag = 1 << i
    levels[permissions[i].name] = permissions[i]
  }
}
