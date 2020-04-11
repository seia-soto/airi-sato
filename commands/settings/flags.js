const translations = require('../../translations')
const { flags } = require('../../config')

module.exports = {
  fn: async (app, message, opts) => {
    const embed = {
      title: opts.translation.title,
      description: opts.translation.description,
      fields: []
    }
    const translation = translations[message.member.settings.language].flags.guilds

    for (let i = 0, l = flags.guilds.length; i < l; i++) {
      const flagName = flags.guilds[i]
      const flagStatusText = message.guild.settings.flag & (1 << i)
        ? opts.translation.enabled
        : opts.translation.disabled

      embed.fields.push({
        name: `${flagName} (${flagStatusText})`,
        value: translation[flagName]
      })
    }

    message.channel.createMessage({ embed })
  },
  permissions: [
    'user'
  ]
}
