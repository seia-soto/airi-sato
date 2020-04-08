const debug = require('./debug')

const log = debug('messageCreate')

module.exports = (app, message) => {
  const preferredEnvironment =
    (message.channel.type === 0)
  if (!preferredEnvironment) {
    return
  }

  log(message.content)
}
