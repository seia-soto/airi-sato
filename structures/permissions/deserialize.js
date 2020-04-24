const { permissions } = require('../../config')
const debug = require('./debug')
const levels = require('./levels')

module.exports = () => {
  debug('deserializing permission levels')

  for (let i = 0, l = permissions.length; i < l; i++) {
    const permission = permissions[i]
    const flag = 1 << i

    permission.flag = flag

    levels[permission.name] = permission
  }
}
