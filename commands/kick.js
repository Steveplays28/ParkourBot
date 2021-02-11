const { prefix, bot_color } = require("../config"), 
    Discord = require("discord.js")

module.exports = {
    run: async(message, args, client) => {
        const toKick = message.mentions.users.first()
        err_embed = new Discord.MessageEmbed()
            .setTitle('Error')
            .setColor(err_color)
        
        if(!toKick)
            return message.channel.send(err_embed.addField('User not found', `Couldn't find User (${args[0]})`, false)
        )
        
        toKick.kick();
        message.channel.send(`Kicked user ${toKick.name}!`);
    },
    name:   "Kick",
    alias:  ["kickmember"],
    desc:   "Kicks the mentioned user.",
    usage:  `\`\`${prefix}kick [@user] [reason]\`\``
}