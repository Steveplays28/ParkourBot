const ms = require("ms")

const { prefix, bot_color, err_color, mute, logging_channel} = require("../config"), 
    Discord = require("discord.js")

    
module.exports = {
        run: async(message, args, client) => {
        let err_embed = new Discord.MessageEmbed()
            .setTitle('Error')
            .setColor(err_color)
        /**
         * `GuildMember` that should be muted
         * @type Discord.GuildMember
         */
        const toMute = message.guild.member(message.mentions.users.first())
        
        /**
         * If the user couln't be found, return error 
         */
        if(!toMute)
        return message.channel.send(
            err_embed.addField('User not found',`Couldn't find user (${args[0] ? args[0] : 'No user specified'})`,false)
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

        /**
         * `Role` that will be asigned to the member when muted
         * @type Discord.Role
         */
        const muteRole = message.guild.roles.cache.find(role => role.name == mute.mute_role_name)

        /**
         * @type String
         */
        const muteTime = args[1]
        /**
         * If `muteTime` is not defined, return error
         */
        if(!muteTime) {
            return message.channel.send(
                err_embed.addField(`No time specified`,`Couldn't find time`,false)
            )
        }
        /**
         * If `muteTime` is no valid time, return error
         */
        if(isNaN(ms(muteTime))) {
            return message.channel.send(
                err_embed.addField(`Invalid time argument`,`Couldn't parse given time (${args[1]}) to milliseconds`,false)
            )
        }
        /**
         * The `muteTime` in milliseconds
         * @type Number
         */
        const muteTimeMS = ms(muteTime)
        /**
         * Shift `args` twice, to remove the mention and time arguments
         */
        args.shift()
        args.shift()
        /**
         * Joined args from `args[2]` to `args[∞]`
         * @type String
         */
        const reason = args.join(' ')
        /**
         * wait until `muteRole` is added to the member
         */
        await (toMute.roles.add(muteRole))
        /**
         * `MessageEmbed` that is sent after muting succescully
         */
        const embed = new Discord.MessageEmbed()
            .setColor(mute.muted_color)
            .setTitle(`${toMute.user.tag} has been muted`)
            .addField(`Duration: ${ms(muteTimeMS, {long : true})}
                ${reason ? 'Reason: ' : ''}${reason}
                `.replace(/    /g,''),
                '\u200B',
                false
            )
            .setFooter(message.member.guild.name, message.member.guild.iconURL())
            .setTimestamp(Date.now())

        /**
         * Send the embed to the channel the user was muted in and to the `logging_channel` that is declaed in `config.js`
         */
        message.channel.send(embed)
        message.guild.channels.cache.find(channel => channel.name.toLowerCase() == logging_channel || channel.name.toLowerCase() == logging_channel.replace(/ /g,'-')).send(embed)

        /**
         * Set the timeout for the role removal to `muteTimeMS`
         */
        setTimeout(function () {
            toMute.roles.remove(muteRole)
        },muteTimeMS)
    },
    name:   "tempmute",
    alias:  ["mute"],
    desc:   "Mutes a user for a certain amount of time.",
    usage:  `\`\`${prefix}tempmute {@User} {time} (reason)\`\``
}