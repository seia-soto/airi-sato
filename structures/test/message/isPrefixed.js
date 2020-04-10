module.exports = (message, prefixes) => {
  for (let i = 0, l = prefixes.length; i < l; i++) {
    if (message.startsWith(prefixes[i])) {
      return prefixes[i]
    }
  }

  return 0
}
