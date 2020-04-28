const synchronizer = {
  ban: {
    fn: async (target, source) => {
      const bans = await source.getBans()
      const currentBans = await target.getBans()

      for (let i = 0, l = bans.length; i < l; i++) {
        if (!currentBans.some(ban => ban.user.id === bans[i].user.id)) {
          await target.banMember(bans[i].user.id, 0, 'Server synchronization by Airi-Sato.')
        }
      }
    },
    permissions: [
      'banMembers'
    ]
  }
}
const validScopes = Object.keys(synchronizer)
const activeGuilds = []

module.exports = {
  fn: async (app, message, opts) => {
    const syncOpts = {
      target: message.guild.id,
      source: message.arguments[1],
      scopes: [
        message.arguments[0]
      ]
    }
    const removeRatelimit = second => {
      setTimeout(() => {
        activeGuilds.splice(activeGuilds.findIndex(guild => guild === message.guild.id), 1)
      }, second * 1000)
    }

    if (syncOpts.scopes[0] === 'all') {
      syncOpts.scopes = validScopes
    }

    if (message.member.id !== message.guild.ownerID) {
      return message.channel.createMessage(opts.translation.notFromGuildOwner)
    }
    if (activeGuilds.includes(message.guild.id)) {
      return message.channel.createMessage(opts.translation.ratelimited)
    }
    if (!syncOpts.target || !validScopes.includes(syncOpts.scopes[0])) {
      return message.channel.createMessage({
        embed: {
          title: opts.translation.sync,
          description: opts.translation.syncDescription,
          fields: validScopes.map(scope => {
            return {
              name: `${scope} (${opts.translation.localizedScopeNames[scope]})`,
              value: opts.translation.scopeDescriptions[scope]
            }
          })
        }
      })
    }

    const source = app.guilds.get(syncOpts.source)

    if (!source) {
      return message.channel.createMessage(opts.translation.targetGuildNotExists)
    }
    if (message.member.id !== source.ownerID) {
      return message.channel.createMessage(opts.translation.syncBetweenDifferentOwner)
    }

    source.client = source.members.find(member => member.id === app.user.id)

    activeGuilds.push(message.guild.id)

    const status = await message.channel.createMessage(opts.translation.synchronizing.bind({ source: source.name }))

    for (let i = 0, l = syncOpts.scopes.length; i < l; i++) {
      const scope = syncOpts.scopes[i]

      for (let k = 0, s = synchronizer[scope].permissions.length; k < s; k++) {
        const permission = synchronizer[scope].permissions[k]

        if (!message.guild.client.permission.has(permission) || !source.client.permission.has(permission)) {
          removeRatelimit(2)

          return status.edit(opts.translation.permissionLack.bind({
            permission: opts.translation.localizedPermissionNames[permission]
          }))
        }
      }

      await synchronizer[scope].fn(message.guild, source)
    }

    status.edit(opts.translation.synchronized.bind({ source: source.name }))

    removeRatelimit(15)
  },
  permission: [
    'moderator'
  ]
}
