const createRequest = require('./createRequest')

module.exports = async opts => {
  if (!opts.keyword) {
    return []
  }

  const buffer = await createRequest({
    uri: '/ajax/search/top/' + encodeURIComponent(opts.keyword),
    useCache: opts.useCache
  })
  const data = JSON.parse(buffer.content)

  data.body = data.body || {}
  data.body.illust = data.body.illust || {}
  data.body.illust.data = data.body.illust.data || []
  data.body.illust.data = data.body.illust.data.splice(0, opts.limit || 5)

  return data.body.illust.data.filter(item => !item.isAdContainer)
}
