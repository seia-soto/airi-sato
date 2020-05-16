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
  }
}

module.exports = async knex => {
  await createTables(schemas)
  await createMetadata('v1.10.4')

  if (await knex.schema.hasTable('authentications')) {
    await knex.schema.dropTable('authentications')
  }

  const guilds = await knex('guilds')
    .select('*')

  for (let i = 0, l = guilds.length; i < l; i++) {
    const guild = guilds[i]

    await knex('guilds')
      .update({
        flag: guild.flag >>> 1 < 2
      })
      .where({
        id: guild.id
      })
  }
}
