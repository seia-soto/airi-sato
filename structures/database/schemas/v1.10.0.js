const createMetadata = require('../createMetadata')
const createTables = require('../createTables')

const schemas = {
  app: async knex => {
    await knex.schema.createTable('app', table => {
      table.string('key', 32)
      table.string('value', 256)

      return table
    })
  },
  guilds: async knex => {
    await knex.schema.createTable('guilds', table => {
      table.increments()

      table.string('serviceId', 64)
      table.string('prefix', 8)
      table.integer('flag')

      return table
    })
  },
  users: async knex => {
    await knex.schema.createTable('users', table => {
      table.increments()

      table.string('serviceId', 64)
      table.string('language', 8)
      table.integer('flag')

      return table
    })
  },
  authentications: async knex => {
    await knex.schema.createTable('authentications', table => {
      table.increments()

      table.string('serviceId', 64)
      table.string('guildId', 64)
      table.string('status', 16)

      return table
    })
  }
}

module.exports = async () => {
  await createTables(schemas)
  await createMetadata('v1.10.0')
}
