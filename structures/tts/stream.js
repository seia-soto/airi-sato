const crypto = require('crypto')
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const stream = require('stream')
const restyGoogleTranslate = require('resty-google-translate')

const cache = require('./cache')

const { PassThrough } = stream

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
    const responseStreamProxy = new PassThrough()

    response.body.pipe(responseStreamProxy)

    if (cache[hash] !== -1) {
      const cacheFileStreamProxy = new PassThrough()
      const cacheFileStream = fs.createWriteStream(cacheFilePath)

      cache[hash] = -1

      response.body
        .pipe(cacheFileStreamProxy)
        .pipe(cacheFileStream)
        .on('finish', () => {
          cache[hash] = cacheFilePath
        })
    }

    return responseStreamProxy
  }
}
