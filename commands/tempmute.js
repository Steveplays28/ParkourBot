const { prefix, bot_color, err_color, mute } = require("../config"), 
    mute_role_name = mute.mute_role_name,
    muted_color = mute.muted_color,
    required_permission = mute.required_permission,
    Discord = require("discord.js")

module.exports = {
    run: async(message, args, client) => {
        const toMute = message.mentions.users.first()
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
        // if(message.guild.member(toMute).hasPermission(required_permission)) 
        // return message.channel.send(
        //     err_embed.addField('Can\'t be muted',`Couldn't mute User with Permission: ${required_permission}`,false)
        // )
        //#endregion
        
        
        //set the muteRole
        let muteRole = message.guild.roles.cache.find(role => role.name == mute_role_name)
        
        //no mute role -> create one
        //#region create role
        if(!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: mute_role_name,
                        color: muted_color,
                        permissions: [
                            'VIEW_CHANNEL',
                            'READ_MESSAGE_HISTORY'
                        ]
                    }
                })
            }
            catch (e) {
                console.log(e.stack)
            }
        }
        //#endregion
    },
    name:   "tempmute",
    alias:  ["mute"],
    desc:   "Mutes a User for a certain amount of time.",
    usage:  `\`\`${prefix}tempmute [@User] [time] [reason]\`\``
}