const Discord = require('discord.js')
const Mongoose = require('mongoose')
const { err_color } = require('../../config')
const types = require('../types')

module.exports = {
  /**
   * 
   * @param {Discord.Message} message 
   * @param {String[]} args 
   * @param {Discord.Client} client 
   * @param {Mongoose.Model} Ticket 
   */
  run: async (message, args, client, Ticket) => {
    let err_embed = new Discord.MessageEmbed().setTitle('Error').setColor(err_color)
    
    /**
     * If the specified list type is invalid or undefined, return error
     */
    if(!args[1] || !types.listTypes.includes(args[1])) {
      return message.channel.send(
        err_embed.addField(
          `Invalid list type`,
          args[1] ? `\`${args[1]}\` is not a valid list type` : `No ticket type specified`,
          false
        )
      )
    }


    const type = args[1].toLowerCase()

    if(type == 'all') {
      try {
        await Ticket.find({}, (err, docs) => { 
          if(err) console.log(err)
          docs.forEach(doc => {
            try {
              message.channel.send(new Discord.MessageEmbed()
                .setAuthor(client.users.cache.find(user => user.id == doc.userID).tag)
                .setTitle('Ticket')
                .setFooter(client.guilds.cache.find(guild => guild.id == doc.link.match(/https?\:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/)[1]))
                .setTimestamp(Date.parse(doc.timestamp))
                .addField(
                  doc.type.charAt(0).toUpperCase() + doc.type.slice(1),
                  doc.content + '\n' + `[Go to message](${doc.link})`,
                  false
                )
                .setDescription(`***ID:** ${doc.ticketID}*`)
              )
            }
            catch(err) {
              console.log(err)
            }
          })
        }).catch(err => console.log(err))
      } catch (err) {
          console.log(err)
      }
    } else {
      try {
        await Ticket.find({ type: type.slice(0,-1) }, (err, docs) => { 
          if(err) console.log(err)
          docs.forEach(doc => {
            try {
              message.channel.send(new Discord.MessageEmbed()
                .setAuthor(client.users.cache.find(user => user.id == doc.userID).tag)
                .setTitle('Ticket')
                .setFooter(client.guilds.cache.find(guild => guild.id == doc.link.match(/https?\:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/)[1]))
                .setTimestamp(Date.parse(doc.timestamp))
                .addField(
                  doc.type.charAt(0).toUpperCase() + doc.type.slice(1),
                  doc.content + '\n' + `[Go to message](${doc.link})`,
                  false
                )
                .setDescription(`***ID:** ${doc.ticketID}*`)
              )
            }
            catch(err) {
              console.log(err)
            }
          })
        }).catch(err => console.log(err))
      } catch (err) {
        console.log(err)
      }
    }
  },
  name: "print"
}