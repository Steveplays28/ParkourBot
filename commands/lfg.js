const { prefix, managing_color } = require("../config"),
    Discord = require("discord.js")

module.exports = {
    run: async (message, args, client) => {
        var embed = new Discord.MessageEmbed()
            .setColor(managing_color)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(message.member.guild.name, message.member.guild.iconURL())
            .setTimestamp(Date.now())

        embed.addFields(
            {
                name: `*${message.member.nickname || message.member.user.username}* is looking for a group to play ParkourFPS!`,
                value: `${args.join(" ")} ؜\n؜`,
                inline: false
            }
        )
        const LFGRole = message.guild.roles.cache.find(role => role.name == "LFG")
        message.member.roles.add(LFGRole)
        message.delete()
        message.channel.send(LFGRole, embed)
    },
    name: "LookingForGroup",
    alias: ["lfg"],
    desc: "Marks the author as LFG and notifies the other people that are looking for a group.",
    usage: `\`\`${prefix}lfg [message]\`\``
}