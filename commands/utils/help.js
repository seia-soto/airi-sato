const { collection } = require('../../structures/commands')

module.exports = {
  fn: async (app, message, opts) => {
    const embed = {
      title: opts.translation.title,
      description: opts.translation.description,
      fields: []
    }
    const commandNames = Object.keys(collection)

    for (let i = 0, l = commandNames.length; i < l; i++) {
      const command = collection[commandNames[i]]

      if (!command.alias) {
        let categoryIndex = embed.fields.findIndex(field => field.name === command.category)

        if (categoryIndex === -1) {
          categoryIndex = embed.fields.length
        }

        embed.fields[categoryIndex] = embed.fields[categoryIndex] || {
          name: command.category,
          value: ''
        }
        embed.fields[categoryIndex].value += '`' + command.name + '` '
      }
    }

    message.channel.createMessage({ embed })
  },
  permissions: [
    'user'
  ]
}
