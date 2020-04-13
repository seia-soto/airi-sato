const debug = require('./debug')
const histories = require('./histories')
const profiles = require('./profiles')

module.exports = (type, id) => {
  histories[type] = histories[type] || []
  histories[type][id] = histories[type][id] || 0

  histories[type][id]++

  debug(`creating usage history of '${type}': ${id}`)

  setTimeout(
    () => histories[type][id]--,
    profiles[type].historyExpiresIn
  )
}
