const levels = require('../levels')

const levelNames = Object.keys(levels)

module.exports = async member => {
  let flag = 1

  for (let i = 0, l = levelNames.length; i < l; i++) {
    const level = levels[levelNames[i]]

    // NOTE: ID verification
    if (!level.id.includes(member.id)) {
      continue
    }

    // NOTE: permission verification
    let permissionAllowed = 0

    for (let k = 0, s = level.permission.length; k < s; k++) {
      if (member.permission.has(level.permission[k])) {
        permissionAllowed += 1
      }
    }

    if (permissionAllowed !== level.permission.length) {
      continue
    }

    for (let k = 0, s = i; k < s; k++) {
      flag = flag | 1 << k
    }

    break
  }

  return flag
}
