const tts = require('../../structures/tts')

const activeGuilds = []

module.exports = {
  fn: async (app, message, opts) => {
    const voiceState = message.member.voiceState
    const languageCode = message.member.settings.language.split('_')[0]
    const text = message.arguments.join(' ').replace(/\n/g, ' ')

    if (!voiceState.channelID) {
      return message.channel.createMessage(opts.translation.voiceChannelNotFound)
    }
    if (!message.arguments.length) {
      return message.channel.createMessage(opts.translation.requestTextNotFound)
    }
    if (text.length > 250) {
      return message.channel.createMessage(opts.translation.requestTextTooLong)
    }
    if (activeGuilds.includes(message.guild.id)) {
      return message.channel.createMessage(opts.translation.ratelimited)
    }

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

    connection.play(stream)
    connection.on('end', () => {
      setTimeout(() => {
        if (!activeGuilds.includes(message.guild.id)) {
          app.leaveVoiceChannel(voiceState.channelID)
        }
      }, 30 * 1000)
      setTimeout(() => {
        activeGuilds.splice(activeGuilds.findIndex(guild => guild === message.guild.id), 1)
      }, 2 * 1000)
    })
  }
}
