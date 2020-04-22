const { flags } = require('../../config')

const re = {
  input: /#?([A-Fa-f\d]{3,6})/i,
  name: /#([A-Fa-f\d]{3,6})/i
}

module.exports = {
  fn: async (app, message, opts) => {
    if (!(message.guild.settings.flag & 1 << flags.guilds.indexOf('color'))) {
      return message.channel.createMessage(opts.translation.functionDisabled)
    }
    if (!message.guild.client.permission.has('manageRoles')) {
      return message.channel.createMessage(opts.translation.permissionLack)
    }
    if (!message.arguments.length) {
      let removedRoleCount = 0

      for (let i = 0, l = message.member.roles.length; i < l; i++) {
        const colorRole = message.guild.roles.find(role => role.id === message.member.roles[i])

        if (re.name.test(colorRole.name)) {
          await message.member.removeRole(message.member.roles[i])

          removedRoleCount++
        }
      }

      if (removedRoleCount) {
        return message.channel.createMessage(opts.translation.removedAllColorProfiles)
      } else {
        return message.channel.createMessage(opts.translation.colorProfileNotFound)
      }
    }

    const matched = re.input.exec(message.arguments[0])

    if (!matched) {
      return message.channel.createMessage(opts.translation.invalidColorCode)
    }

    for (let i = 0, l = message.member.roles.length; i < l; i++) {
      const colorRole = message.guild.roles.find(role => role.id === message.member.roles[i])

      if (re.name.test(colorRole.name)) {
        await message.member.removeRole(message.member.roles[i])
      }
    }

    const color = matched[1].toLowerCase()
    const roleName = '#' + color

    let colorRole = await message.guild.roles.find(role => role.name === roleName)

    if (!colorRole) {
      colorRole = await message.guild.createRole({
        name: roleName,
        permissions: 0,
        color: parseInt(color, 16),
        hoist: false,
        mentionable: false
      })
    }

    await message.member.addRole(colorRole.id)

    message.channel.createMessage(opts.translation.addedColorProfile.bind({ roleName }))
  },
  aliases: [
    'colors'
  ]
}
