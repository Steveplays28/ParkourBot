const { prefix, managing_color, err_color, logging_channel } = require("../config"), 
    Discord = require("discord.js")

/**
 * `MessageEmbed` that is used, when an error is returned to the channel
 */


module.exports = {
    run: async(message, args, client) => {
        let err_embed = new Discord.MessageEmbed()
            .setTitle('Error')
            .setColor(err_color) 

        /**
         * The reason for the kick
         */
        args.shift()
        const reason = args.join(' ')

        /**
         * The `MessageEmbed` that is send to the channel the kick was executed in
         */
        const embed = new Discord.MessageEmbed()
            .setColor(managing_color)
            .setAuthor(message.mentions.users.first().tag + " has been kicked!", message.mentions.users.first().avatarURL())
            .setFooter(message.member.guild.name, message.member.guild.iconURL())
            .setTimestamp(Date.now())
        
        if(reason)
        embed.addField(
            `Reason: ${reason}`,
            `\u200b`,
            false
        )
        else
        embed.setDescription(`\u200b`)

        /**
         * `GuildMember` that should be kicked
         * @type Discord.GuildMember
         */
        const toKick = message.mentions.users.first()

        /**
         * If there's no user found, return an error
         */
        if(!toKick) 
        return message.channel.send(
            err_embed.addField('User not found',`Couldn't find user (${args[0] ? args[0] : 'No user specified'})`,false)
        )

        /**
         * Actually kick the person
         */
        // toKick.kick()

        /**
         * Send an embed, to tell, that the user has been kicked succesfully
         */
        message.channel.send(embed)

        /**
         * Send an embed to the `loggging_channel` defined in `config.js`, to tell, that the user has been kicked succesfully
         */
        message.guild.channels.cache.find(channel => channel.name.toLowerCase() == logging_channel || channel.name.toLowerCase() == logging_channel.replace(/ /g,'-')).send(embed)
    },
    name:   "Kick",
    alias:  ["kickmember"],
    desc:   "Kicks the mentioned user.",
    usage:  `\`\`${prefix}kick {@user} (reason)\`\``
}