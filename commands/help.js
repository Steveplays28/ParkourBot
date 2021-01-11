const { prefix, managing_color } = require("../config"), Discord = require("discord.js"), path=require("path")
var cmds = []
require("fs").readdirSync(path.join(__dirname, ".")).forEach(file => {
    cmds.push(require(path.join(__dirname, ".", file)))
  })
/*
const add = require("./add")
const advanced = require("./advanced")
const auth = require("./authlink")
const basic = require("./basic")
const multiply = require("./multiply")
*/
module.exports = {
    run: async(message, args, client) => {
            
        var embed = new Discord.MessageEmbed()
            .setColor(managing_color)
            .setTitle("Help")

        
        cmds.forEach(cmd => {
                if(cmd.name){
                embed.addFields(
                    {
                        name:   `> ${cmd.name}`,
                        value:  `> Description: **${cmd.desc}**
                        > Usage: **${cmd.usage}**
                        > Aliases: **${cmd.alias.join(", ")}**
                        
                        `.replace(/  /g, ""),
                        inline: false
                    }
                )}
        })
        message.channel.send(embed)



    },
    name:   "Help",
    alias:  ["h","?"],
    desc:   "Gives information about commands.",
    usage:  `\`\`${prefix}help\`\``
}