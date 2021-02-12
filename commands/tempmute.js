const ms = require("ms")

const { prefix, bot_color, err_color, mute, mod_category_channel_name: modCategoryChannelName} = require("../config"), 
    mute_role_name = mute.mute_role_name,
    muted_color = mute.muted_color,
    required_permission = mute.required_permission,
    permissions = mute.permissions,
    Discord = require("discord.js")

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
        
        let reason = ' '
        for(let i = 2; i < args.length; i++) {
            reason += args[i] + ' '
        }
        await (toMute.roles.add(muteRole))

        message.channel.send(
            new Discord.MessageEmbed()
            .setColor(muted_color)
            .setTitle(`${toMute} has been muted`)
            .addField(
                `Duration: ${ms(muteTime)}
                Reason: ${reason}
                `.replace(/    /g,''),
                false
            )
            .setFooter(message.member.guild.name, message.member.guild.iconURL())
            .setTimestamp(Date.now())
        )

        setTimeout(function () {
            toMute.roles.remove(muteRole)
        },ms(muteTime))
    },
    name:   "tempmute",
    alias:  ["mute"],
    desc:   "Mutes a user for a certain amount of time.",
    usage:  `\`\`${prefix}tempmute [@User] [time] [reason]\`\``
}