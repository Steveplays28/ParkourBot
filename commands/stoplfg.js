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
    run: async (message, args, client) => {
        /**
         * Connect to the database
         */
        await Mongoose.connect(process.env.MONGOPASS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        /**
         * `Data` Model 
         */
        const Data = require('../models/data')

        /**
         * Find messages by the specified userID
         * If there are any, log the errors
         * Find the message on discord and delete it
         * If there are any, log the errors
         * Delete the document from the database
         */
        await Data.find({ userID: client.user.id }, (err, docs) => { 
            if(err) console.log(err)
            docs.forEach(doc => {
                try {
                    client.guilds.cache.find(guild => guild.id == doc.guildID).channels.cache.find(channel => channel.id == doc.channelID && channel.type == 'text').messages.cache.find(message => message.id == doc.messageID).delete() 
                }
                catch(err) {
                    console.log(err)
                    console.log('The message that was looked for may not be cached anyomre')
                }
                Data.findByIdAndDelete(doc._id, (err) => {if(err) console.log(err)})
            })
        }).catch(err => console.log(err))
      
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
    name: "StopLookingForGroup",
    alias: ["stoplfg"],
    desc: "Marks the author as not LFG.",
    usage: `\`\`${prefix}stoplfg\`\``
}