const Koa = require('koa')

const router = require('./router')
const { web } = require('./config')
const debug = require('./webDebugger')

const app = new Koa()

module.exports = (async () => {
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(web.port, () => debug(`listening on port ${web.port}`))
})()
