const { prefix, bot_color } = require("../config"), 
    Discord = require("discord.js")

module.exports = {
    run: async(message, args, Client) => {
        message.delete()
        message.channel.send(new Discord.MessageEmbed()
            .setColor(bot_color)
            .addField('Read the rules', `Please read ${message.guild.rulesChannel ? `<#${message.guild.rulesChannel.id}>` : 'this server\'s rules'}`, false)
        )
    },
    name:   "rules",
    alias:  ["rule"],
    desc:   "Reminds the User, to look at the rules",
    usage:  `\`\`${prefix}rules\`\``
}