const { prefix, managing_color, lfg_role_name } = require("../config"),
    Discord = require("discord.js")
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
        }).catch(err => console.log(err))
        /**
         * Data Model imported from `../models/data`
         * @type Mongoose.Model
         */
        const Data = require('../models/data')

        /**
         * `MessageEmbed` that is sent after execution of the command
         */
        const embed = new Discord.MessageEmbed()
            .setColor(managing_color)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(message.member.guild.name, message.member.guild.iconURL())
            .setTimestamp(Date.now())
            .addField(
                `*${message.member.nickname || message.member.user.username}* is looking for a group to play ParkourFPS!`,
                `${args.join(" ")} ؜\n؜`,
                false
            )
        /**
         * Role specified by the `lfg_role_name` declared in `config.js`
         * @type Discord.Role
         */
        const LFGRole = message.guild.roles.cache.find(role => role.name == lfg_role_name)
        /**
         * Add the role to the member that sent the message
         */
        message.member.roles.add(LFGRole)
        /**
         * Delete the message
         */
        message.delete()
        /**
         * Send `LFGRole` and `embed` to the channel, the message was sent in
         * Then save the message in the database
         */
        message.channel.send(LFGRole, embed).then(msg => {
            const instance = new Data({
                userID: msg.author.id,
                guildID: msg.guild.id,
                channelID: msg.channel.id,
                messageID: msg.id,
              })
            instance.save((err) => { if(err) return console.log(err)})          
        })
    },
    name: "LookingForGroup",
    alias: ["lfg"],
    desc: "Marks the author as LFG and notifies the other people that are looking for a group.",
    usage: `\`\`${prefix}lfg [message]\`\``
}