const { prefix, bot_color } = require("../config"), Discord = require("discord.js"), path=require("path")

module.exports = {
    run: async(message, args, client) => {
        /**
         * MessageEmbed that is sent after execution of the command
         */
        const embed = new Discord.MessageEmbed()
            .setColor(bot_color)
            .setTitle("None")
            .addField(
                `NONE`,
                `${message.author}, You said: ${message}
                I say: none
                `.replace(/  /g, ""),
                false
            )
        
        /**
         * Send the message
         */
        message.channel.send(embed)
    },
    name:   "None-command",
    alias:  ["none"],
    desc:   "Gives none.",
    usage:  `\`\`${prefix}none-command\`\``
}