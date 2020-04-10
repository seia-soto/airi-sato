const { knex } = require('../database')
const cache = require('./cache')
const debug = require('./debug')

module.exports = async (type, data) => {
  try {
    debug(`updating '${type}' settings: ${data.serviceId}`)

    cache[type][data.serviceId] = data

    await knex(type)
      .update({
        flag: data.flag
      })
      .where({
        serviceId: data.serviceId
      })

    return 1
  } catch (error) {
    debug(error)

    return 0
  }
}
