const translations = require('../../translations')

const languages = Object.values(translations)

module.exports = {
  fn: async (app, message, opts) => {
    const language = (message.arguments.join(' ') || '').toLowerCase()
    const translation = languages.find(item => {
      const matched =
        (item.languageCode.toLowerCase() === language) ||
        (item.languageName.toLowerCase() === language) ||
        (item.localizedLanguageName.toLowerCase() === language)

      return matched
    })

    if (translation) {
      message.member.settings.language = translation.languageCode

      await message.member.settings.update()

      message.channel.createMessage(opts.translation.updatedLanguage.bind({
        language: translation.localizedLanguageName
      }))
    } else {
      const languageList = languages
        .map(item => `> ${item.languageCode} (${item.localizedLanguageName}, ${item.languageName})`)
        .join('\n')

      message.channel.createMessage(opts.translation.translationNotFound.bind({ languageList }))
    }
  }
}
