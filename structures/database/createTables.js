const debug = require('./debug')
const knex = require('./knex')

module.exports = async (schemas) => {
  const schemaNames = Object.keys(schemas)

  for (let i = 0, l = schemaNames.length; i < l; i++) {
    if (!await knex.schema.hasTable(schemaNames[i])) {
      debug(`creating new table which not exists: ${schemaNames[i]}`)

      await schemas[schemaNames[i]](knex)
    }
  }
}
