module.exports = (message, prefixes) => {
  for (let i = 0, l = prefixes.length; i < l; i++) {
    if (!message.startsWith(prefixes[i])) {
      return 0
    }
  }

  return 1
}
