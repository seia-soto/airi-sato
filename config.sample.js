module.exports = {
  app: {
    token: '',
    options: {
      autoconnect: true,
      compress: true,
      connectionTimeout: 10 * 1000,
      disableEvents: [
        'CHANNEL_CREATE',
        'CHANNEL_DELETE',
        'CHANNEL_UPDATE',
        'GUILD_BAN_ADD',
        'GUILD_BAN_ADD_REMOVE',
        'GUILD_CREATE',
        'GUILD_DELETE',
        'GUILD_MEMBER_ADD',
        'GUILD_MEMBER_REMOVE',
        'GUILD_MEMBER_UPDATE',
        'GUILD_ROLE_CREATE',
        'GUILD_ROLE_DELETE',
        'GUILD_ROLE_UPDATE',
        'GUILD_UPDATE',
        // 'MESSAGE_CREATE',
        'MESSAGE_DELETE',
        'MESSAGE_DELETE_BULK',
        'MESSAGE_UPDATE',
        'PRESENCE_UPDATE',
        'TYPING_START',
        'USER_UPDATE',
        'VOICE_STATE_UPDATE'
      ],
      disableEveryone: true,
      largeThreshold: 25,
      messageLimit: 25,
      opusOnly: true
    }
  },
  database: {
    client: 'sqlite3',
    connection: {
      filename: './bin/main.db'
    }
  },
  permissions: [
    {
      name: 'staff',
      terms: {
        id: [
          '' // NOTE: Developer's user ID.
        ]
      }
    },
    {
      name: 'moderator',
      terms: {
        permission: [
          'manageGuild'
        ]
      }
    },
    {
      name: 'user'
    }
  ],
  ratelimit: {
    historyExpiresIn: 2 * 1000,
    maxRequestSize: 4
  },
  settings: {
    defaults: {
      guilds: {
        prefix: 'se',
        flag: 0
      },
      users: {
        language: 'ko',
        flag: 0
      }
    }
  },
  flags: {
    guilds: [
      'color'
    ],
    users: []
  },
  translations: {
    defaultLanguage: 'ko'
  }
}
