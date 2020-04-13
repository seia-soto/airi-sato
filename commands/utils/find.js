const ratelimit = require('../../structures/ratelimit')

const validScopes = [
  'amount',
  'before',
  'user'
]
const numberFilter = text => {
  const result = text.match(/[\d]{1,}/)

  if (result) {
    return result[0]
  } else {
    return 0
  }
}
const createTextFilter = text => {
  return messageObj => messageObj.content.includes(text)
}
const createUserFilter = userId => {
  return messageObj => messageObj.author.id === userId
}

module.exports = {
  fn: async (app, message, opts) => {
    if (ratelimit.isLimited('command.find', message.channel.id)) {
      return message.channel.createMessage(opts.translation.functionAlreadyRunning)
    }

    const keywords = []
    const options = {
      amount: 0,
      before: 0,
      user: 0
    }

    for (let i = 0, l = message.arguments.length; i < l; i++) {
      const [scope, optionData] = message.arguments[i].split(':')
      const option = numberFilter(optionData || '')
      const isScopeValid =
        (option) &&
        (validScopes.includes(scope)) &&
        (!isNaN(option)) &&
        (!options[scope])

      if (isScopeValid) {
        options[scope] = option
      } else {
        keywords.push(message.arguments[i])
      }
    }

    options.amount = Number(options.amount)

    if (options.amount > 800) {
      options.amount = 800
    }
    if (options.amount <= 0) {
      options.amount = 200
    }

    options.before = options.before || message.id

    const keyword = keywords.join(' ')

    if (!keyword) {
      return message.channel.createMessage(opts.translation.noKeywordProvided)
    }

    ratelimit.accumulate('command.find', message.channel.id)

    const filters = [createTextFilter(keyword)]
    const embed = {
      title: opts.translation.title,
      description: opts.translation.description.bind({
        keyword,
        amount: options.amount
      }),
      fields: []
    }

    if (options.user) {
      filters.push(createUserFilter(options.user))
    }

    const filterLength = filters.length
    const recentMessages = await message.channel.getMessages(options.amount, options.before)

    for (let i = 0, l = recentMessages.length; i < l; i++) {
      if (embed.fields.length >= 5) {
        break
      }

      const recentMessage = recentMessages[i]
      let testPassed = 0

      for (let k = 0; k < filterLength; k++) {
        if (filters[k](recentMessage)) {
          testPassed += 1
        }
      }

      if (testPassed === filterLength) {
        embed.fields.push({
          name: opts.translation.whoseMessage.bind({ author: recentMessage.author.username }),
          value: opts.translation.messageContent.bind({
            content: recentMessage.content.split('').slice(0, 100).join(''),
            link: `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${recentMessage.id}`
          })
        })
      }
    }

    message.channel.createMessage({ embed })
  }
}
