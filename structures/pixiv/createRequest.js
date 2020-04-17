const fetch = require('node-fetch')

const cache = require('./cache')

const defaultHeaders = {
  dnt: 1,
  referer: 'https://www.pixiv.net/',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36'
}
const defaultHeaderNames = Object.keys(defaultHeaders)

module.exports = async opts => {
  if (!opts.uri) {
    return 0
  }

  opts.url = 'https://www.pixiv.net' + opts.uri
  opts.headers = opts.headers || []

  for (let i = 0, l = defaultHeaderNames.length; i < l; i++) {
    const headerName = defaultHeaderNames[i]

    opts.headers[headerName] = opts.headers[headerName] || defaultHeaders[headerName]
  }

  if (opts.useCache) {
    cache[opts.uri] = cache[opts.uri] || {}
    cache[opts.uri].content = cache[opts.uri].content || ''
    cache[opts.uri].time = cache[opts.uri].time || 0

    if (cache[opts.uri].time < Date.now()) {
      const response = await fetch(opts.url)

      cache[opts.uri].content = await response.text()
      cache[opts.uri].time = Date.now()
    }

    return cache[opts.uri]
  } else {
    const response = await fetch(opts.url)
    const text = await response.text()

    return {
      time: Date.now(),
      content: text
    }
  }
}
