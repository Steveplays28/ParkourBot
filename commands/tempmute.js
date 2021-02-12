const ms = require("ms")

const { prefix, bot_color, err_color, mute, mod_category_channel_name: modCategoryChannelName, logging_channel} = require("../config"), 
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
        // if(toMute.hasPermission(mute.required_permission)) 
        // return message.channel.send(
        //     err_embed.addField('Can\'t be muted',`Couldn't mute User with Permission: ${mute.required_permission}`,false)
        // ).then(msg => {
        //     msg.delete({timeout: 4000})
        //     message.delete({timeout: 4000})
        // })
        //#endregion

        let muteRole = message.guild.roles.cache.find(role => role.name == mute.mute_role_name)

        let muteTime = args[1]
        if(!muteTime.match(/\d+[a-zA-Z]*/)) {
            muteTime = args[1].match(/\d+/)[0] + 's'
        }
        isNaN(ms(muteTime)) ? muteTime = mute.mute_default_timeout : {}
        const muteTimeMS = ms(muteTime)
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
            .setColor(mute.muted_color)
            .setTitle(`${toMute.user.tag} has been muted`)
            .addField(`Duration: ${ms(muteTimeMS, {long : true})}
                Reason: ${reason}
                `.replace(/    /g,''),
                '؜'
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
    usage:  `\`\`${prefix}tempmute {@User} {time} (reason)\`\``
}