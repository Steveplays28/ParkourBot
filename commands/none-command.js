const { prefix, bot_color } = require("../config"), Discord = require("discord.js"), path=require("path")

module.exports = {
    run: async(message, args, client) => {
            
        var embed = new Discord.MessageEmbed()
            .setColor(bot_color)
            .setTitle("None")


        .addField(
                    `NONE`,
                    `${message.author}, You said: ${message}
                    I say: none
                    `.replace(/  /g, ""),
                    false
            )

        message.channel.send(embed)
    },
    name:   "None-command",
    alias:  ["none"],
    desc:   "Gives none.",
    usage:  `\`\`${prefix}none-command\`\``
}