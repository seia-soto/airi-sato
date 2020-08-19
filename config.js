module.exports = {
  app: {
    token: 'NjMxNDM3MTM2ODAxMDM4MzQ2.XZ21qA.jEV6UCUM9Ct-sGqOWtXQQdQdb0c',
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
      allowedMentions: {
        everyone: false,
        roles: false,
        users: true
      },
      largeThreshold: 25,
      messageLimit: 25,
      opusOnly: true
    }
  },
  web: {
    port: 2199
  },
  database: {
    client: 'sqlite3',
    connection: {
      filename: './.data/data.db'
    }
  },
  permissions: [
    {
      name: 'staff',
      terms: {
        id: [
          '324541397988409355' // NOTE: Developer's user ID.
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
    command: {
      historyExpiresIn: 2 * 1000,
      maxRequestSize: 2
    },
    'command.find': {
      historyExpiresIn: 4 * 1000,
      maxRequestSize: 1
    }
  },
  settings: {
    defaults: {
      guilds: {
        prefix: 'sn',
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
      'color',
      'tts'
    ],
    users: []
  },
  translations: {
    defaultLanguage: 'ko'
  }
}
