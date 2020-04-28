const {
  commands,
  settings,
  ratelimit,
  permissions,
  test
} = require('../structures')
const translations = require('../translations')
const debug = require('./debug')

const log = debug('messageCreate')

module.exports = async (app, message) => {
  message.guild = message.channel.guild
  message.guild.client = message.guild.members.find(member => member.id === app.user.id)

  const isEnvironmentPreferred =
    (!message.member.bot) &&
    (message.content.length) &&
    (message.type === 0) && // NOTE: If message type is `default`
    (message.channel.type === 0) && // NOTE: If channel is `text channel`
    (!ratelimit.isLimited('command', message.member.id)) &&
    (message.channel.permissionsOf(app.user.id).has('sendMessages')) &&
    (message.channel.permissionsOf(app.user.id).has('embedLinks'))
  if (!isEnvironmentPreferred) return

  message.guild.settings = await settings.get('guilds', message.guild.id)
  message.member.settings = await settings.get('users', message.member.id)
  message.member.flag = await permissions.accumulate(message.member)

  message.prefix = test.message.isPrefixed(message.content, [message.guild.settings.prefix])

  if (!message.prefix) return

  message.arguments = message.content
    .replace(message.prefix, '')
    .trim()
    .split(' ')
  message.command = message.arguments.splice(0, 1)[0]

  const command = commands.collection[message.command]
  const isCommandApplicable =
    (command) &&
    (message.member.flag & command.permission)

  if (!isCommandApplicable) return

  const translation = translations[message.member.settings.language].commands[command.name]

  try {
    await command.fn(app, message, {
      translation
    })
  } catch (error) {
    log(error)

    message.channel.createMessage(translations[message.member.settings.language].system.unexpectedErrorWhileCommandExecution)
  } finally {
    ratelimit.accumulate('command', message.member.id)
  }
}
