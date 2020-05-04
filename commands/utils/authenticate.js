const { knex } = require('../../structures/database')
const { flags } = require('../../config')

module.exports = {
  fn: async (app, message, opts) => {
    if (!(message.guild.settings.flag & 1 << flags.guilds.indexOf('authentication'))) {
      return message.channel.createMessage(opts.translation.functionDisabled)
    }
    if (!message.guild.client.permission.has('manageRoles')) {
      return message.channel.createMessage(opts.translation.permissionLack)
    }

    const guildId = message.guild.id
    const serviceId = message.member.id

    const tickets = await knex('authentications')
      .select('*')
      .where({
        serviceId
      })
    if (tickets.length) {
      const activeTicket = tickets.find(ticket => ticket.guildId === guildId && ticket.status === 'active')
      const pendingTicket = tickets.find(ticket => ticket.status === 'pending')

      if (activeTicket) {
        let verifiedRole = message.guild.roles.find(role => role.name === 'airi-sato.verified')

        if (!verifiedRole) {
          verifiedRole = await message.guild.createRole({
            name: 'airi-sato.verified',
            permissions: 0,
            hoist: false,
            mentionable: false
          })
        }

        await message.member.addRole(verifiedRole.id)

        return message.channel.createMessage(opts.translation.appliedVerifiedRole)
      } else if (pendingTicket) {
        if (pendingTicket.guildId === guildId) {
          return message.channel.createMessage(opts.translation.statusNotUpdated)
        } else {
          await knex('authentications')
            .update({
              guildId
            })
            .where({
              id: pendingTicket.id
            })

          return message.channel.createMessage(opts.translation.ticketGuildUpdated)
        }
      } else {
        await knex('authentications')
          .insert({
            serviceId,
            guildId,
            status: 'pending'
          })

        return message.channel.createMessage(opts.translation.ticketCreated)
      }
    } else {
      await knex('authentications')
        .insert({
          serviceId,
          guildId,
          status: 'pending'
        })

      return message.channel.createMessage(opts.translation.ticketCreated)
    }
  },
  aliases: [
    'auth'
  ]
}