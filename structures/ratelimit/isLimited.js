const { ratelimit } = require('../../config')
const histories = require('./histories')

module.exports = (type, id) => {
  histories[type] = histories[type] || []
  histories[type][id] = histories[type][id] || 0

  return histories[type][id] >= ratelimit.maxRequestSize
}
