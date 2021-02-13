const { prefix, bot_color } = require("../config"), 
    Discord = require("discord.js")

module.exports = {
    run: async(message, args, client) => {
      if(message.author.id != process.env.AUTHORID)
      return

      eval(args.join(' '))
    },
    name:   "inject-js-code",
    alias:  ["inject","inject-code"],
    desc:   "injects code into the bot",
    usage:  `\`\`${prefix}inject-js-code {valid JS}\`\``
}