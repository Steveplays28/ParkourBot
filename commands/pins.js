const { prefix, bot_color } = require("../config"), 
    Discord = require("discord.js")

module.exports = {
    run: async(message, args, Client) => {
        message.delete()
        message.channel.send(new Discord.MessageEmbed()
            .setColor(bot_color)
            .addField('Read the Pins', 'Please read this channel\'s pinned messages', false)
        )
    },
    name:   "pins",
    alias:  ["pinned"],
    desc:   "Reminds the User, to look at the pinned messages",
    usage:  `\`\`${prefix}pins\`\``
}