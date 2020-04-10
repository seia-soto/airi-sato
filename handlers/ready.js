const debug = require('./debug')

const log = debug('ready')

module.exports = app => {
  log(`connected to Discord via ${app.user.username} (${app.user.id})`)
}
