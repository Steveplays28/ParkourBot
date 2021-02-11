const ms = require("ms")

const { prefix, bot_color, err_color, mute, mod_category_channel_name: modCategoryChannelName} = require("../config"), 
    mute_role_name = mute.mute_role_name,
    muted_color = mute.muted_color,
    required_permission = mute.required_permission,
    permissions_bool = mute.permissions_bool,
    permissions = mute.permissions,
    Discord = require("discord.js")

module.exports = {
    run: async(message, args, client) => {
        const toMute = message.guild.member(message.mentions.users.first())
        err_embed = new Discord.MessageEmbed()
            .setTitle('Error')
            .setColor(err_color)
            
        //User not found -> return error
        //#region User verification
        if(!toMute) 
        return message.channel.send(
            err_embed.addField('User not found',`Couldn't find User (${args[0]})`,false)
        )
        //#endregion

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
        
        //get the 
        //#region mute role
        let muteRole = message.guild.roles.cache.find(role => role.name == mute_role_name)
        
        //no mute role -> create one
        if(!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: mute_role_name,
                        color: muted_color,
                        permissions: permissions
                    }
                })
                message.guild.channels.cache.each(channel => {
                    channel.updateOverwrite(muteRole,permissions_bool)
                    console.log(channel.parent)
                    // if(channel.parent.name.toLowerCase() == modCategoryChannelName)
                    channel.updateOverwrite(muteRole,{'VIEW_CHANNEL' : false})
                })
            }
            catch (e) {
                console.log(e.stack)
            }
        }
        //#endregion

        // get time the user will be muted for
        //#region get muteTTime
        const muteTime = args[1]
        //
        if(!muteTime)
        return message.channel.send(
            err_embed.addField(`No time specified`,`Couldn't find time`,false)
        ).then(msg => {
            msg.delete({timeout: 4000})
            message.delete({timeout: 4000})
        })
        //#endregion
        
        let reason = ' '
        for(let i = 2; i < args.length; i++) {
            reason += args[i] + ' '
        }
        await (toMute.roles.add(muteRole))
        let embed = message.channel.send(
            new Discord.MessageEmbed()
            .setColor(muted_color)
            .setTitle('Mute')
            .addField(
                `${toMute} has been muted`,
                `Duration: **${ms(muteTime)/1000}s**
                Reason: **${reason}**
                `.replace(/    /g,''),
                false
                )
        ).then(msg => {
            msg.delete({timeout: 4000})
            message.delete({timeout: 4000})
        })
        setTimeout(function () {
            toMute.roles.remove(muteRole)
        },ms(muteTime))
    },
    name:   "tempmute",
    alias:  ["mute"],
    desc:   "Mutes a User for a certain amount of time.",
    usage:  `\`\`${prefix}tempmute [@User] [time] [reason]\`\``
}