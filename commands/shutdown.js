const { prefix, managing_color, err_color } = require("../config"),
    Discord = require("discord.js")

module.exports = {
    run: async (message, args, client) => {
        var embed = new Discord.MessageEmbed()
            .setColor(managing_color)
            .setFooter(message.member.guild.name, message.member.guild.iconURL())
            .setTimestamp(Date.now())

        embed.addFields(
            {
                name: `Shutting down...`,
                value: `:)`,
                inline: false
            }
        )

        client.guilds.cache.each(guild => {
            try {
                guild.channels.cache.find(channel => channel.name.toLowerCase() == startup_logging_channel || channel.name.toLowerCase() == startup_logging_channel.replace(/ /g,'-')).send(new Discord.MessageEmbed()
                    .setTitle(`${client.user.username} is offline now`)
                    .setDescription(`The bot has been shut down`)
                )
            } catch (err) {
                console.log(`No startup logging channel found on "${guild.name}"`)
            }
        })

        message.channel.send(embed)
        setTimeout(function () {
            process.exit()
        },(1000))
        
    },
    name: "Shutdown",
    alias: ["shutdownbot"],
    desc: "Shuts the bot down.",
    usage: `\`\`${prefix}shutdown\`\``
}