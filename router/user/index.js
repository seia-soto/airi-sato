const Router = require('koa-router')

const verify = require('./verify')

const router = new Router()

router.get('/verify', verify)

module.exports = router
