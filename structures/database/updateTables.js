const pkg = require('../../package')
const schemas = require('./schemas')
const createMetadata = require('./createMetadata')
const debug = require('./debug')
const knex = require('./knex')

module.exports = async () => {
  const targetVersion = pkg.version.split('.')

  if (!await knex.schema.hasTable('app')) {
    if (Number(targetVersion[1]) <= 8) {
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

  while (versions.indexOf(`v${targetVersion.join('.')}`) === -1) {
    if (Number(targetVersion[1]) <= 8) {
      break
    }

    debug(`skipping target version of database schema version v${targetVersion.join('.')} because not found`)

    if (Number(targetVersion[2]) === 0) {
      targetVersion[1] -= 1
    } else {
      targetVersion[2] -= 1
    }
  }

  for (let i = versions.indexOf(schemaVersion), l = versions.indexOf(`v${targetVersion.join('.')}`); i <= l; i++) {
    if (schemas[versions[i]]) {
      debug(`updating database schema version to ${versions[i]}`)

      await schemas[versions[i]](knex)
    }
  }
}
