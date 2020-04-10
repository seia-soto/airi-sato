module.exports = async knex => {
  await knex.schema.createTable('guilds', table => {
    table.increments()

    table.string('serviceId')
    table.string('prefix')
    table.integer('flag')

    return table
  })
}
