const { prefix, bot_color, err_color, muted_color, no_mute_permission, mute_role_name } = require("../config"), 
    Discord = require("discord.js")

module.exports = {
    run: async(message, args, client) => {
        const toMute = message.mentions.users.first()
        err_embed = new Discord.MessageEmbed()
            .setTitle('Error')
            .setColor(err_color)



        if(!toMute) 
        return message.channel.send(
            err_embed.addField('User not found',`Couldn't find User (${args[0]})`,false)
        )
        // if(message.guild.member(toMute).hasPermission(no_mute_permission)) 
        // return message.channel.send(
        //     err_embed.addField('Can\'t be muted',`Couldn't mute User with Permission: ${no_mute_permission}`,false)
        // )

        let muteRole = message.guild.roles.cache.find(role => role.name == mute_role_name)
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
        message.channel.send(`${muteRole}`)
    },
    name:   "tempmute",
    alias:  ["mute"],
    desc:   "Mutes a User for a certain amount of time.",
    usage:  `\`\`${prefix}tempmute [@User] [time] [reason]\`\``
}