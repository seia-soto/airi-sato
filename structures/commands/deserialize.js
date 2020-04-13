const categories = require('../../commands')
const { levels } = require('../permissions')
const collection = require('./collection')
const debug = require('./debug')

const categoryNames = Object.keys(categories)

module.exports = () => {
  debug('deserializing command sources')

  for (let i = 0, l = categoryNames.length; i < l; i++) {
    const commands = categories[categoryNames[i]]
    const commandNames = Object.keys(commands)

    debug(`deserializing '${categoryNames[i]}' categorized commands`)

    for (let k = 0, s = commandNames.length; k < s; k++) {
      const command = commands[commandNames[k]]

      command.aliases = command.aliases || []
      command.category = categoryNames[i]
      command.name = commandNames[k]
      command.permission = 0 // NOTE: Permissions in bitfield
      command.permissions = command.permissions || ['user'] // NOTE: Permissions in array

      for (let j = 0, t = command.permissions.length; j < t; j++) {
        command.permission = command.permission | levels[command.permissions[j]].flag
      }

      collection[commandNames[k]] = command

      debug(`registering '${command.name}' command with ${command.permissions.join(', ')} permission`)

      for (let j = 0, n = command.aliases.length; j < n; j++) {
        const commandObj = Object.assign({ alias: true }, command)

        collection[command.aliases[j]] = commandObj

        debug(`creating '${command.aliases[j]}' alias of '${command.name}' command`)
      }
    }
  }
}
