const { prefix, managing_color } = require("../config"), 
    Discord = require("discord.js")

module.exports = {
    run: async(message, args, client) => {
        var embed = new Discord.MessageEmbed()
                .setColor(managing_color)
                .setAuthor(message.mentions.users.first().tag + " has been kicked!", message.mentions.users.first().avatarURL())
                .setFooter(message.member.guild.name, message.member.guild.iconURL())
                .setTimestamp(Date.now())
        
            // embed.addFields(
            //     {
            //         name: `*${message.mentions.users.first().tag} (${message.mentions.members.first().nickname})* has been kicked.`,
            //         value: ` `,
            //         inline: false
            //     }
            // )
        const toKick = message.mentions.users.first()
        // toKick.kick();
        message.channel.send(embed);
    },
    name:   "Kick",
    alias:  ["kickmember"],
    desc:   "Kicks the mentioned user.",
    usage:  `\`\`${prefix}kick {@user} (reason)\`\``
}