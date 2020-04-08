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
      ]
    }
  }
}
