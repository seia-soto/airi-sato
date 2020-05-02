const fetch = require('node-fetch')
const readimage = require('readimage')

const { flags } = require('../../config')

const re = {
  input: /(auto)|#?([A-Fa-f\d]{3,6})/i,
  name: /#([A-Fa-f\d]{3,6})/i
}

const readImage = imageBuffer => {
  return new Promise((resolve, reject) => {
    readimage(imageBuffer, (error, image) => {
      if (error) {
        reject(error)
      }

      resolve(image)
    })
  })
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

      if (colorRole && re.name.test(colorRole.name)) {
        await message.member.removeRole(message.member.roles[i])
      }
    }

    let color = (matched[1] || matched[2]).toLowerCase()

    if (color === 'auto') {
      const response = await fetch(message.member.avatarURL)
      const imageBuffer = await response.buffer()
      const imageData = await readImage(imageBuffer)
      const imageFrame = imageData.frames[0].data
      const pixelRate = 4
      const pixels = new Array(pixelRate).fill(0)

      for (let i = 0, l = imageFrame.length; i < l; i += pixelRate) {
        for (let k = 0; k < pixelRate; k++) {
          pixels[k] += imageFrame[i + k]
        }
      }
      for (let i = 0; i < pixelRate - 1/* Except for `alpha` */; i++) {
        pixels[i] = ~~(pixels[i] / (imageFrame.length / pixelRate))
        pixels[i] = (pixels[i] | 1 << 8).toString(16).slice(1)
      }

      color = pixels.splice(0, 3).join('').toLowerCase()
    }

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
