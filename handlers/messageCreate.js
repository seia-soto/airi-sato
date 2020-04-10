const {
  settings,
  permissions,
  test
} = require('../structures')
const debug = require('./debug')

const log = debug('messageCreate')

module.exports = async (app, message) => {
  message.guild = message.channel.guild
  message.guild.client = message.guild.members.find(member => member.id === app.user.id)

  const isEnvironmentPreferred =
    (message.type === 0) && // NOTE: If message type is `default`
    (message.channel.type === 0) && // NOTE: If channel is `text channel`
    (
      message.guild.client.permission.has('sendMessages') ||
      message.channel.permissionOverwrites.has('sendMessages')
    ) &&
    (
      message.guild.client.permission.has('embedLinks') ||
      message.channel.permissionOverwrites.has('embedLinks')
    )
  if (!isEnvironmentPreferred) return

  message.guild.settings = await settings.get('guilds', message.guild.id)
  message.member.settings = await settings.get('users', message.member.id)
  message.member.flag = await permissions.determine.user(message.member)

  const isCaseApplicable =
    (test.message.isPrefixed(message.content, [message.guild.settings.prefix]))
  if (!isCaseApplicable) return

  log(JSON.stringify(message.member.settings))
}
