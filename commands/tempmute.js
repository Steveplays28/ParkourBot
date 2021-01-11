const ms = require("ms")

const { prefix, bot_color, err_color, mute } = require("../config"), 
    mute_role_name = mute.mute_role_name,
    muted_color = mute.muted_color,
    required_permission = mute.required_permission,
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
        //////////////
        // commented because of testing purposes
        //////////////
        //#region check permissions of "To be muted"
        // if(toMute.hasPermission(required_permission)) 
        // return message.channel.send(
        //     err_embed.addField('Can\'t be muted',`Couldn't mute User with Permission: ${required_permission}`,false)
        // )
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
        )
        //#endregion

        await (toMute.roles.add(muteRole))
        message.channel.send(
            new Discord.MessageEmbed()
            .setColor(muted_color)
            .setTitle('Mute')
            .addField(
                `${toMute} has been muted`,
                `Duration: **${muteTime}**
                Reason: **${args.splice(0,3).join(' ')}**
                `.replace(/    /g,''),
                false
                )
        )

    },
    name:   "tempmute",
    alias:  ["mute"],
    desc:   "Mutes a User for a certain amount of time.",
    usage:  `\`\`${prefix}tempmute [@User] [time] [reason]\`\``
}