const { prefix, managing_color, err_color, startup_logging_channel } = require("../config"),
    Discord = require("discord.js")

module.exports = {
    run: async (message, args, client) => {
        /**
         * `MessageEmbed` that is sent before shuting down the bot
         */
        const embed = new Discord.MessageEmbed()
            .setColor(managing_color)
            .setFooter(message.member.guild.name, message.member.guild.iconURL())
            .setTimestamp(Date.now())
            .setDescription(`Shutting down ${client.user.username}`)

        /**
         * Send a offline message to the `startup_logging_channel` declared in `config.js`
         */
        await (
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
        )

        /**
         * Send the message to the channel, the bot was shut down in
         */
        message.channel.send(embed)
        /**
         * Set timeout for the shutdown of the bot
         */
        setTimeout(function () {
            process.exit()
        },5000)
        
    },
    name: "Shutdown",
    alias: ["shutdownbot"],
    desc: "Shuts the bot down.",
    usage: `\`\`${prefix}shutdown\`\``
}