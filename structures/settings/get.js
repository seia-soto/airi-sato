const { settings } = require('../../config')
const { knex } = require('../database')
const cache = require('./cache')
const debug = require('./debug')
const update = require('./update')

module.exports = async (type, serviceId) => {
  try {
    cache[type] = cache[type] || {}

    if (!cache[type][serviceId]) {
      debug(`fetching '${type}' settings from database: ${serviceId}`)

      let [item] = await knex(type)
        .select('*')
        .where({
          serviceId
        })
      if (!item) {
        debug(`creating new settings object because '${type}' settings are not available`)

        const initialData = {
          serviceId,
          ...settings.defaults[type]
        }

        await knex(type)
          .insert(initialData)

        item = initialData
      }

      item.update = async () => await update(type, item)

      cache[type][serviceId] = item
    }

    return cache[type][serviceId]
  } catch (error) {
    debug(error)

    return 0
  }
}
