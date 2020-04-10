const Eris = require('eris')

const handlers = require('./handlers')
const structures = require('./structures')
const config = require('./config')
const debug = require('./debug')
const pkg = require('./package')

const app = new Eris(config.app.token, config.app.options)
const handlerNames = Object.keys(handlers)

module.exports = (async () => {
  debug(`starting ${pkg.name}@v${pkg.version} at ${Date.now()}`)

  structures.permissions.deserialize()
  await structures.database.createTables()

  for (let i = 0, l = handlerNames.length; i < l; i++) {
    debug(`registering new event handler for Eris: ${handlerNames[i]}`)

    app.on(handlerNames[i], handlers[handlerNames[i]].bind(null, app))
  }

  app.connect()
})()
