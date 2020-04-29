const pkg = require('../../package')
const createTables = require('./createTables')
const debug = require('./debug')
const knex = require('./knex')

module.exports = async version => {
  await createTables({
    app: async knex => {
      await knex.schema.createTable('app', table => {
        table.string('key', 32)
        table.string('value', 256)

        return table
      })
    }
  })

  debug('inserting basic metadata into database')

  const metadata = await knex('app').select('*')

  if (metadata.find(data => data.key === 'version')) {
    await knex('app')
      .update({
        value: version || pkg.version
      })
      .where({
        key: 'version'
      })
  } else {
    await knex('app')
      .insert({
        key: 'version',
        value: version || pkg.version
      })
  }
}
