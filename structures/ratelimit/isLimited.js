const histories = require('./histories')
const profiles = require('./profiles')

module.exports = (type, id) => {
  histories[type] = histories[type] || []
  histories[type][id] = histories[type][id] || 0

  return histories[type][id] >= profiles[type].maxRequestSize
}
