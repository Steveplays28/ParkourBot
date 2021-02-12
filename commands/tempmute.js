const ms = require("ms")

const { prefix, bot_color, err_color, mute, mod_category_channel_name: modCategoryChannelName, logging_channel} = require("../config"), 
    mute_role_name = mute.mute_role_name,
    muted_color = mute.muted_color,
    required_permission = mute.required_permission,
    permissions = mute.permissions,
    Discord = require("discord.js")

let err_embed = new Discord.MessageEmbed()
    .setTitle('Error')
    .setColor(err_color)

module.exports = {
    run: async(message, args, client) => {
        const toMute = message.guild.member(message.mentions.users.first())
        
        if(!toMute)
        return message.channel.send(
            err_embed.addField('User not found',`Couldn't find user (${args[0]})`,false)
        )

        //Person to be kicked has required permissions -> return error
        //#region check permissions of "To be muted"
        // if(toMute.hasPermission(required_permission)) 
        // return message.channel.send(
        //     err_embed.addField('Can\'t be muted',`Couldn't mute User with Permission: ${required_permission}`,false)
        // ).then(msg => {
        //     msg.delete({timeout: 4000})
        //     message.delete({timeout: 4000})
        // })
        //#endregion

        let muteRole = message.guild.roles.cache.find(role => role.name == mute_role_name)

        const muteTime = args[1] * 1000
        //
        if(!muteTime)
        return message.channel.send(
            err_embed.addField(`No time specified`,`Couldn't find time`,false)
        )
        args.shift()
        args.shift()
        let reason = args.join(' ')
        
        await (toMute.roles.add(muteRole))

        const embed = new Discord.MessageEmbed()
            .setColor(muted_color)
            .setTitle(`${toMute.user.tag} has been muted`)
            .addField(`Duration: ${ms(muteTime)}
                Reason: ${reason}
                `.replace(/    /g,''),
                ''
            )
            .setFooter(message.member.guild.name, message.member.guild.iconURL())
            .setTimestamp(Date.now())

        message.channel.send(embed)
        message.guild.channels.cache.find(channel => channel.name.toLowerCase() == logging_channel || channel.name.toLowerCase() == logging_channel.replace(/ /g,'-')).send(embed)

        setTimeout(function () {
            toMute.roles.remove(muteRole)
        },ms(muteTime))
    },
    name:   "tempmute",
    alias:  ["mute"],
    desc:   "Mutes a user for a certain amount of time.",
    usage:  `\`\`${prefix}tempmute [@User] [time] [reason]\`\``
}