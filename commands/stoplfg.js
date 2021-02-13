const { group } = require("console")
const { prefix, message_deletiong_timeout: timeout } = require("../config"),
    Discord = require("discord.js")
const Mongoose = require('mongoose')

module.exports = {
    run: async (message, args, client) => {
        await Mongoose.connect(process.env.MONGOPASS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        const Data = require('../models/data')
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
      

        const LFGRole = message.guild.roles.cache.find(role => role.name == "LFG")
        message.member.roles.remove(LFGRole)
        message.delete()
        message.channel.send("You have stopped looking for a group.")
            .then(msg => msg.delete({timeout: timeout}))
            .catch(err => console.log(err))
    },
    name: "StopLookingForGroup",
    alias: ["stoplfg"],
    desc: "Marks the author as not LFG.",
    usage: `\`\`${prefix}stoplfg\`\``
}