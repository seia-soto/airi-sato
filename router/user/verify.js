const fetch = require('node-fetch')

const { knex } = require('../../structures/database')
const config = require('../../config')

module.exports = async ctx => {
  const { authorization, auth } = ctx.req.headers

  if (authorization !== config.app.token) {
    ctx.body = {
      error: 'invalid_secret'
    }

    return
  }

  const response = await fetch('https://discordapp.com/api/v6/users/@me', {
    headers: {
      Authorization: `Bearer ${auth}`,
      'User-Agent': 'Airi-Sato (https://seia.io/airi-sato, web-authentication)'
    }
  })
  const user = await response.json()

  if (!user.id) {
    ctx.body = {
      error: 'invalid_user'
    }

    return
  }

  await knex('authentications')
    .update({
      status: 'active'
    })
    .where({
      serviceId: user.id,
      status: 'pending'
    })

  ctx.body = {
    error: 0
  }
}
