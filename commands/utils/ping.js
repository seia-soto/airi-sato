module.exports = {
  fn: async (app, message, opts) => {
    message.channel.createMessage(opts.translation.pong)
  },
  aliases: [
    'pong'
  ]
}
