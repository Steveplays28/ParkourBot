const { prefix, err_embed, err_color } = require("../config")
const fs = require('fs'), path = require('path')
const Discord = require("discord.js")
const Mongoose = require('mongoose')

/**
 * Array, containing the `require()` methods for each ticketCommand, provided in the `TicketHandler` folder
 * @type String[]
 */
let ticketCommands = []
let validTicketString = []
fs.readdirSync(path.join(__dirname,'..','TicketHandler','ticketCommands')).forEach(file => {
  ticketCommands.push(`require('../TicketHandler/ticketCommands/${file}')`)
  validTicketString.push(file.match(/^(.*)\.(.*)/)[1])
})


module.exports = {
  run: async (message, args, client) => {
    let err_embed = new Discord.MessageEmbed().setTitle('Error').setColor(err_color)

    /**
     * If insufficient arguments are give, return error
     */
    if(!args[0]) {
      return message.channel.send(
        err_embed.addField(
          `Insufficient arguments`,
          `You didn't give enough arguments for the command to be executed`,
          false
        )
      )
    }

    if(!validTicketString.includes(args[0])) {
      return message.channel.send(
        err_embed.addField(
          `Invalid ticket command`,
          `\`${args[0]}\` is not a valid ticket command`,
          false
        )
      )
    }
    

    /**
     * Connect to the database
     */
    await Mongoose.connect(process.env.MONGOPASS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }).catch(err => console.log(err))

    /**
     * `Ticket` Model
     * @type Mongoose.Model
     */
    const Ticket = require('../models/ticket')

    /**
     * `TicketCommand` defined by `args[0]`
     * @type NodeModule
     */
    const ticketCommand = eval(ticketCommands.find(com => eval(com).name == args[0].toLowerCase()))

    /**
     * Run the `ticketCommand`
     */
    ticketCommand.run(message, args, client, Ticket)
  },
  name: "ticket",
  alias: ["ticketsystem"],
  desc: "Runs the TicketHandler",
  usage: `\`\`${prefix}ticket {ticketCommand} {[arguments]}\`\``
}