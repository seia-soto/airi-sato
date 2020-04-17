const pixiv = require('../../structures/pixiv')

module.exports = {
  fn: async (app, message, opts) => {
    const command = (message.arguments.splice(0, 1)[0] || '').toLowerCase()

    switch (command) {
      case 'search': {
        if (!message.arguments[0]) {
          return message.channel.createMessage(opts.translation.emptySearchKeyword)
        }

        const keyword = message.arguments.join(' ')
        const embed = {
          title: opts.translation.pixivSearch,
          description: opts.translation.sharedWarning.bind({ keyword }),
          fields: []
        }
        const artworks = await pixiv.search({
          keyword,
          useCache: 1
        })

        if (!artworks.length) {
          message.channel.createMessage(opts.translation.noSearchResultFound.bind({ keyword }))
        }

        for (let i = 0, l = artworks.length; i < l; i++) {
          const artwork = artworks[i]

          embed.fields.push({
            name: artwork.illustTitle,
            value: opts.translation.artworkDescription.bind(artwork)
          })
        }

        message.channel.createMessage({ embed })

        break
      }
    }
  }
}
