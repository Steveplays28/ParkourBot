const { prefix, bot_color } = require("../config")
const Discord = require("discord.js")
const Mongoose = require('mongoose')
const ms = require("ms")

module.exports = {
    /**
     * 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     * @param {Discord.Client} client 
     */
    run: async(message, args, client) => {
      if(!message.channel.name.toLowerCase().includes('bot')) return

      await Mongoose.connect(process.env.MONGOPASS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }).catch(err => console.log(err))

      const Event = require('../models/event')

      await Event.find({ type : 'devlog' }, (err, docs) => {
        if(err) return console.log(err)
        docs.forEach(doc => {
          message.channel.send(new Discord.MessageEmbed()
            .setTitle('Last Devlog')
            .setDescription(`The last Devlog was posted at \`${doc.timestamp.toString().match(/^\w+ \w+ \d+ \d+ \d+:\d+:\d+ \w+\+\d+/)}\` \n\`${ms(Date.now() - doc.timestamp, { long: true })}\` since the last Devlog`)
          )
        })
      })
    },
    name:   "Devlog",
    alias:  ["last-devlog"],
    desc:   "Time of/since the last devlog",
    usage:  `\`\`${prefix}devlog\`\``
}