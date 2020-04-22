const fs = require('fs')
const path = require('path')

const cache = require('./cache')

module.exports = async () => {
  const cachePath = path.join(__dirname, '..', '..', 'bin', 'tts')

  if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath, { recursive: true })
  } else {
    const files = fs.readdirSync(cachePath)

    for (let i = 0, l = files.length; i < l; i++) {
      if (files[i].endsWith('.tts.mp3')) {
        const hash = files[i].replace('.tts.mp3', '')

        cache[hash] = path.join(path.join(cachePath, hash))
      }
    }
  }
}
