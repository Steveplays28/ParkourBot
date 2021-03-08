const { prefix } = require("../config")
const Discord = require("discord.js")
const path = require("path")
const fs = require('fs')

/**
 * @type [{
 *  run,
 *  name: String,
 *  alias: String[],
 *  desc: String,
 *  usage: String
 * }]
 */
let commands = []
fs.readdirSync('./commands').forEach(file => {
  commands.push(`require('./${file}')`)
})


module.exports = {
  run: async(message, args, client) => {
    if(!args[0]) {
      let commandNameList = []
      commands.forEach(element => {
        commandNameList.push(eval(element).name)
      })

      return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Help')
        .setDescription(`Type \`${prefix}help command\` to get help for a specific command`)
        .addField(
          `Here is a list of all commands:`,
          `\`${commandNameList.join('`, `')}\`
          `.replace(/  /g,''),
          false
        )
      )
    }
    const command = eval(commands.find(com => eval(com).name.toLowerCase() == args[0].toLowerCase() || eval(com).alias.includes(args[0].toLowerCase())))
    if(command) {
      return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Help')
        .addField(
          `Help for \`${command.name}\`:`,
          `**Name:** ${command.name}
          **Description:** ${command.desc}
          **Usage:** ${command.usage}
          **Aliases:** ${command.alias.join(', ')}
          `.replace(/  /g,'')
        )
      )
    } 
    else {
      return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Invalid command`)
        .setDescription(`Command \`${command}\` was not found`)
      )
    }
  },
  name:   "Help",
  alias:  ["h","?"],
  desc:   "Gives information about commands.",
  usage:  `\`\`${prefix}help (command)\`\``
}