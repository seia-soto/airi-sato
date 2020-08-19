const createLogger = require('../structures/utils/createLogger')

const log = createLogger('handlers')

module.exports = type => {
  return message => log(`<${type}> ${message}`)
}
