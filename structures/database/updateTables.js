const pkg = require('../../package')
const schemas = require('./schemas')
const createMetadata = require('./createMetadata')
const debug = require('./debug')
const knex = require('./knex')

module.exports = async () => {
  if (!await knex.schema.hasTable('app')) {
    if (pkg.version.replace(/[a-zA-Z\W]/g, '') <= '180') {
      debug('the version of database schema is lower than v1.9.0')
      debug('creating metadata table to start integration')

      await createMetadata()
    } else {
      debug('structuring the database with schema version as current package version')

      await schemas['v' + pkg.version]()

      return
    }
  }

  const metadata = await knex('app').select('*')
  const schemaVersion = (metadata.find(data => data.key === 'version') || { value: 'v' + pkg.version }).value

  const versions = Object.keys(schemas)

  for (let i = versions.indexOf(schemaVersion) + 1, l = versions.indexOf('v' + pkg.version); i <= l; i++) {
    debug(`updating database schema version to ${versions[i]}`)

    await schemas[versions[i]]()
  }
}
