const createRequest = require('./createRequest')

module.exports = async opts => {
  opts.query = opts.query || ''
  opts.page = opts.page || 0

  const buffer = await createRequest({
    uri: `/t/json.php?dir=disk&q=${opts.query}&p=${opts.page}`,
    useCache: opts.useCache
  })
  const data = JSON.parse(buffer.content.slice(1))

  return data
}
