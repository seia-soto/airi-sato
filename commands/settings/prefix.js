module.exports = {
  fn: async (app, message, opts) => {
    const prefix = message.arguments[0] || ''
    const isValidPrefix =
      (prefix.length > 0) &&
      (prefix.length <= 16)

    if (isValidPrefix) {
      message.guild.settings.prefix = prefix

      await message.guild.settings.update()

      message.channel.createMessage(opts.translation.updatedPrefix.bind({ prefix }))
    } else {
      message.channel.createMessage(opts.translation.invalidPrefix)
    }
  },
  permissions: [
    'moderator'
  ]
}
