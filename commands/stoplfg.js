const { prefix, message_deletiong_timeout: timeout, lfg_role_name } = require("../config")
/**
 * `Discord.js` package
 */
const Discord = require("discord.js")
/**
 * `Mongoose` package
 */
const Mongoose = require('mongoose')

module.exports = {
    /**
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {Discord.Client} client 
     */
    run: async (message, args, client) => {
        /**
         * `Data` Model 
         * @type Mongoose.Model
         */
        const Data = require('../models/data')

        /**
         * If the member isn't looking for a group, return message
         */
        if(!message.member.roles.cache.find(role => role.name == lfg_role_name)) {
            return message.channel.send( new Discord.MessageEmbed()
                .setTitle(`Invalid action`)
                .addField(
                    `You are currently not looking for a group`,
                    `You need to be looking for a group using \`${prefix}${require('./lfg').name}\` to be able to do this`,
                    false
                )
            )
        }

        /**
         * Find messages by the specified userID
         * If there are any, log the errors
         * Find the message on discord and delete it
         * If there are any, log the errors
         * Delete the document from the database
         */
        try {
            await Data.find({ userID: message.author.id }, (err, docs) => { 
                if(err) console.log(err)
                if(docs) {
                    docs.forEach(doc => {
                        try {
                            client.guilds.cache.find(guild => guild.id == doc.guildID).channels.cache.find(channel => channel.id == doc.channelID && channel.type == 'text').messages.cache.find(message => message.id == doc.messageID).delete() 
                        }
                        catch(err) {
                            if(!err.stack.includes('Cannot read property \'delete\' of undefined'))
                            console.log(err)
                            console.log('\x1b[33mThe message that was looked for may not be cached anyomre\x1b[0m')
                        }
                        Data.findByIdAndDelete(doc._id, (err) => {if(err) console.log(err)})
                    })
                }
            }).catch(err => console.log(err))
        } catch (err) {
            console.log(err)
        }
      
        /**
         * Role, specified by the `lfg_role_name` in `config.js`
         */
        const LFGRole = message.guild.roles.cache.find(role => role.name == lfg_role_name)
        /**
         * Romove the `LFGRole` from the user
         */
        message.member.roles.remove(LFGRole)
        /**
         * Delete the message, that was sent by the user
         */
        message.delete()
        /**
         * Send a message to tell the user he stoped looking for a group and delete it afterwards
         */
        message.channel.send("You have stopped looking for a group.")
            .then(msg => msg.delete({timeout: timeout}))
            .catch(err => console.log(err))
    },
    name: "stoplfg",
    alias: ["stoplookingforgroup"],
    desc: "Marks the author as not LFG.",
    usage: `\`\`${prefix}stoplfg\`\``
}