const debug = require('debug')

const pkg = require('../package')

const log = debug(`${pkg.name}:handlers`)

module.exports = type => {
  return message => log(`<${type}> ${message}`)
}
