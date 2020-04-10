module.exports = async knex => {
  await knex.schema.createTable('users', table => {
    table.increments()

    table.string('serviceId')
    table.integer('flag')

    return table
  })
}
