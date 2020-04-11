const categories = require('../../commands')
const { levels } = require('../permissions')
const collection = require('./collection')

const categoryNames = Object.keys(categories)

module.exports = () => {
  for (let i = 0, l = categoryNames.length; i < l; i++) {
    const commands = categories[categoryNames[i]]
    const commandNames = Object.keys(commands)

    for (let k = 0, s = commandNames.length; k < s; k++) {
      const command = commands[commandNames[k]]

      command.aliases = command.aliases || []
      command.category = command.category || categoryNames[i]
      command.name = commandNames[k]
      command.permission = 0 // NOTE: Permissions in bitfield
      command.permissions = command.permissions || ['user'] // NOTE: Permissions in array

      for (let j = 0, t = command.permissions.length; j < t; j++) {
        command.permission = command.permission | levels[command.permissions[j]].flag
      }

      collection[commandNames[i]] = command

      for (let j = 0, n = command.aliases.length; j < n; j++) {
        const commandObj = Object.assign({ alias: true }, command)

        collection[commandNames[k]] = commandObj
      }
    }
  }
}
