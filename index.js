const Eris = require('eris')

const handlers = require('./handlers')
const structures = require('./structures')
const config = require('./config')
const debug = require('./debug')
const pkg = require('./package')

const app = new Eris(config.app.token, config.app.options)
const handlerNames = Object.keys(handlers)

String.prototype.bind = function (parameters) {
  let text = this
  const keys = text.match(/\{(.*?)\}/g)

  if (!keys) return this

  for (let i = 0; i < keys.length; i++) {
    const keyname = keys[i].replace('{', '').replace('}', '')

    text = text.replace(keys[i], parameters[keyname] || '')
  }

  return text
}

module.exports = (async () => {
  debug(`starting ${pkg.name}@v${pkg.version} at ${Date.now()}`)

  structures.permissions.deserialize()
  structures.commands.deserialize()
  structures.ratelimit.registerProfiles()
  structures.tts.registerCaches()
  await structures.database.createTables()

  for (let i = 0, l = handlerNames.length; i < l; i++) {
    debug(`registering new event handler: ${handlerNames[i]}`)

    app.on(handlerNames[i], handlers[handlerNames[i]].bind(null, app))
  }

  app.connect()
})()
