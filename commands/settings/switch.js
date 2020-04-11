const { flags } = require('../../config')

module.exports = {
  fn: async (app, message, opts) => {
    const featureName = message.arguments[0] || ''

    if (!featureName) {
      return message.channel.createMessage(opts.translation.noFeatureName)
    }
    if (!flags.guilds.includes(featureName)) {
      return message.channel.createMessage(opts.translation.invalidFeature.bind({ featureName }))
    }

    const featureFlag = 1 << flags.guilds.indexOf(featureName)
    const isFeatureEnabled = message.guild.settings.flag & featureFlag

    if (isFeatureEnabled) {
      message.guild.settings.flag = message.guild.settings.flag >>> featureFlag

      await message.guild.settings.update()

      message.channel.createMessage(opts.translation.disabledFeature.bind({ featureName }))
    } else {
      message.guild.settings.flag = message.guild.settings.flag | featureFlag

      await message.guild.settings.update()

      message.channel.createMessage(opts.translation.enabledFeature.bind({ featureName }))
    }
  },
  permissions: [
    'moderator'
  ]
}
