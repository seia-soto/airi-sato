const createRequest = require('./createRequest')

module.exports = async opts => {
  opts.mode = opts.mode || 'daily'

  const buffer = await createRequest({
    uri: '/ranking.php?format=json&content=illust&mode=' + opts.mode,
    useCache: opts.useCache
  })
  const data = JSON.parse(buffer.content)

  data.contents = data.contents || []
  data.contents = data.contents.splice(0, opts.limit || 5)

  if (data.excludeNSFW) {
    data.contents = data.contents.filter(item => !item.illust_content_type.sexual)
  }

  return data.contents
}
