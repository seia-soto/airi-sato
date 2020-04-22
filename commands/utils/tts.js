const fs = require('fs')
const path = require('path')

const tts = require('../../structures/tts')

const assetsPath = path.join(__dirname, '..', '..', 'assets')

const modeFeaturedSounds = {
  twip: path.join(assetsPath, 'twip_tts_Coins.mp3')
}
const availableModes = [
  'twip'
]
const activeGuilds = []

module.exports = {
  fn: async (app, message, opts) => {
    const voiceState = message.member.voiceState
    const languageCode = message.member.settings.language.split('_')[0]

    if (!voiceState.channelID) {
      return message.channel.createMessage(opts.translation.voiceChannelNotFound)
    }
    if (!message.arguments.length) {
      return message.channel.createMessage(opts.translation.requestTextNotFound)
    }
    if (message.arguments.join(' ').length > 150) {
      return message.channel.createMessage(opts.translation.requestTextTooLong)
    }
    if (activeGuilds.includes(message.guild.id)) {
      return message.channel.createMessage(opts.translation.ratelimited)
    }

    const words = []

    let mode = 0

    for (let i = 0, l = message.arguments.length; i < l; i++) {
      const [scope, optionData] = message.arguments[i].split(':')

      if (scope === 'mode' && availableModes.includes(optionData)) {
        mode = optionData
      } else {
        words.push(message.arguments[i])
      }
    }

    const text = words.join(' ').replace(/\n/g, ' ')
    const voicePermission = app.getChannel(voiceState.channelID).permissionsOf(app.user.id)

    if (!voicePermission.has('voiceConnect')) {
      return message.channel.createMessage(opts.translation.voiceConnectPermissionLack)
    }
    if (!voicePermission.has('voiceSpeak')) {
      return message.channel.createMessage(opts.translation.voiceSpeakPermissionLack)
    }

    activeGuilds.push(message.guild.id)

    const connection = await app.joinVoiceChannel(voiceState.channelID)
    const stream = await tts.stream({
      text,
      language: languageCode,
      hint: 'en'
    })

    message.channel.createMessage(opts.translation.playingTTS)

    if (mode) {
      const featuredSoundStream = fs.createReadStream(modeFeaturedSounds[mode])

      connection.play(featuredSoundStream)
    } else {
      connection.play(stream)
    }

    connection.on('end', () => {
      if (mode) {
        mode = 0

        connection.play(stream)
      } else {
        setTimeout(() => {
          if (!activeGuilds.includes(message.guild.id)) {
            app.leaveVoiceChannel(voiceState.channelID)
          }
        }, 30 * 1000)
        setTimeout(() => {
          activeGuilds.splice(activeGuilds.findIndex(guild => guild === message.guild.id), 1)
        }, 2 * 1000)
      }
    })
  }
}
