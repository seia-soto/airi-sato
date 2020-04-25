const { permissions } = require('../../config')

module.exports = async member => {
  let flag = 0

  for (let i = 0, l = permissions.length; i < l; i++) {
    const permission = permissions[i]
    const terms = permission.terms || {}

    terms.id = terms.id || []
    terms.permission = terms.permission || []

    let requiredPermissionSize = 0

    for (let k = 0, s = terms.permission.length; k < s; k++) {
      if (member.permission.has(terms.permission[k])) {
        requiredPermissionSize += 1
      }
    }

    const isPermissionSuitable =
      (!terms.id.length || terms.id.includes(member.id)) &&
      (!terms.permission.length || requiredPermissionSize >= terms.permission.length)

    if (!isPermissionSuitable) continue

    for (let k = i; k < l; k++) {
      flag = flag | 1 << k
    }

    break
  }

  return flag
}
