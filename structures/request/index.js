const fetch = require('node-fetch')

module.exports = (defaults = {}) => {
  defaults.baseURL = defaults.baseURL || ''
  defaults.formType = defaults.formType || 'x-www-form-urlencoded'
  defaults.headers = defaults.headers || {}
  defaults.method = defaults.method || 'get'
  defaults.expireAfter = defaults.expiresAfter || 0 // NOTE: Cache lifetime

  const cache = {}

  return async (opts = {}) => {
    const req = {}

    const headerNames = Object.keys(opts.headers)
    const defaultHeaderNames = Object.keys(defaults.headers)

    req.url = defaults.baseURL + (opts.url || '')
    req.method = opts.method || defaults.method

    if (defaults.cache && cache[req.url]) {
      return cache[opts.url].data
    }

    for (let i = 0, l = headerNames.length; i < l; i++) {
      const headerName = headerNames[i]

      req.headers = req.headers || {}
      req.headers[headerNames[i]] = opts.headers[headerName] || defaults.headers[headerName]
    }
    for (let i = 0, l = defaultHeaderNames.length; i < l; i++) {
      const headerName = defaultHeaderNames[i]

      req.headers = req.headers || {}
      req.headers[headerName] = req.headers[headerName] || defaults.headers[headerName]
    }

    if (opts.form) {
      opts.form.type = opts.form.type || 'x-www-form-urlencoded'
      opts.form.data = opts.form.data || ''

      switch (opts.form.type || defaults.formType) {
        case 'x-www-form-urlencoded': {
          const urlencoded = []
          const formKeys = Object.keys(opts.form.data || {})

          for (let i = 0, l = formKeys.length; i < l; i++) {
            const key = formKeys[i]

            urlencoded.push(encodeURIComponent(key) + '=' + encodeURIComponent(opts.form.data[key]))
          }

          req.body = urlencoded.join('&')
        }
      }
    }

    const response = await fetch(req.url, req)
    const text = await response.text()

    if (defaults.expiresAfter) {
      cache[req.url] = {
        createdAt: Date.now(),
        data: text
      }

      setTimeout(() => {
        delete cache[req.url]
      }, defaults.expiresAfter)
    }

    return text
  }
}
