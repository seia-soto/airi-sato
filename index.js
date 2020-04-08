const Eris = require('eris')

const handlers = require('./handlers')
const config = require('./config')
const debug = require('./debug')
const pkg = require('./package')

const app = new Eris(config.app.token, config.app.options)
const handlerNames = Object.keys(handlers)

debug(`starting ${pkg.name}@v${pkg.version} at ${Date.now()}`)

for (let i = 0, l = handlerNames.length; i < l; i++) {
  debug(`registering new event handler for Eris: ${handlerNames[i]}`)

  app.on(handlerNames[i], handlers[handlerNames[i]].bind(null, app))
}

app.connect()
