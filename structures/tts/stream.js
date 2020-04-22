const crypto = require('crypto')
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const restyGoogleTranslate = require('resty-google-translate')

const cache = require('./cache')

module.exports = async opts => {
  opts.text = opts.text.replace(/\n/g, ' ')

  const cachePath = path.join(__dirname, '..', '..', 'bin', 'tts')
  const hash = crypto.createHash('md5').update(opts.text).digest('hex')
  const cacheFilePath = path.join(cachePath, hash + '.tts.mp3')

  if (cache[hash]) {
    return fs.createReadStream(cacheFilePath)
  } else {
    const audioURL = await restyGoogleTranslate.tts(opts)
    const response = await fetch(audioURL)

    if (cache[hash] !== 0) {
      const cacheFileStream = fs.createWriteStream(cacheFilePath)

      cache[hash] = 0

      response.body
        .pipe(cacheFileStream)
        .on('finish', () => {
          cache[hash] = cacheFilePath
        })
    }

    return response.body
  }
}
