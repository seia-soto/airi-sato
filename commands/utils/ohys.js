const ohys = require('../../structures/ohys')

module.exports = {
  fn: async (app, message, opts) => {
    const command = (message.arguments.splice(0, 1)[0] || '').toLowerCase()

    switch (command) {
      case 'latest': {
        const _page = Number(message.arguments[0]) || 0
        const page = Math.floor(_page / 30)
        const startIndex = (_page % 6) * 5
        const embed = {
          title: opts.translation.latestFeed,
          description: `${opts.translation.currentFeedNumber.bind({ page: String(page), startIndex: String(startIndex) })}\n${opts.translation.sharedWarning}`,
          fields: []
        }
        const files = await ohys.search({
          page,
          useCache: 1
        })

        for (let i = startIndex, l = startIndex + 5; i < l; i++) {
          const file = files[i]

          embed.fields.push({
            name: file.t,
            value: opts.translation.fileLink.bind({ link: file.a })
          })
        }

        message.channel.createMessage({ embed })

        break
      }
      default: {
        message.channel.createMessage({
          embed: {
            title: opts.translation.ohys,
            description: opts.translation.baseDescription,
            fields: [
              {
                name: 'latest [page]',
                value: opts.translation.latestUsage
              }
            ]
          }
        })
      }
    }
  }
}
