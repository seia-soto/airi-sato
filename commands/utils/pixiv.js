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
          description: opts.translation.searchResult.bind({ keyword }) + opts.translation.sharedWarning,
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
      case 'ranking': {
        const availableMode = ['daily', 'weekly', 'monthly', 'rookie']
        const mode = message.arguments[0] || 'daily'

        if (!availableMode.includes(mode)) {
          return message.channel.createMessage(opts.translation.invalidModeProvided.bind({ modes: availableMode.join(', ') }))
        }

        const localizedModeName = opts.translation.rankingModes[mode]
        const embed = {
          title: opts.translation.pixivRanking.bind({ mode: localizedModeName }),
          description: `${opts.translation.rankingResult.bind({ mode: localizedModeName })}
${opts.translation.sharedWarning}`,
          fields: []
        }
        const artworks = await pixiv.ranking({
          mode,
          excludeNSFW: !message.channel.nsfw,
          useCache: 1
        })

        if (!message.channel.nsfw) {
          embed.description += '\n' + opts.translation.nsfwContentExcluded
        }
        if (!artworks.length) {
          return message.channel.createMessage(opts.translation.rankingNotAvailable)
        }

        for (let i = 0, l = artworks.length; i < l; i++) {
          const artwork = artworks[i]

          artwork.tags = artwork.tags.join(', ')

          embed.fields.push({
            name: artwork.title,
            value: opts.translation.rankedArtworkDescription.bind(artwork)
          })
        }

        message.channel.createMessage({ embed })
      }
    }
  }
}
