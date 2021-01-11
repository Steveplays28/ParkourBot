const Discord = require('discord.js'), fs = require('fs'), settings = require('./config');
const { prefix } = require('./config'), env = require('dotenv').config()
const client = new Discord.Client()

const token = env.parsed.TOKEN

client.login(token)


this.commands = [];
fs.readdirSync('./commands').forEach(x => this.commands.push(require('./commands/' + x)))


client.on('ready', async () => {
    console.log(`${client.user.username}`)
        client.user.setActivity(`${prefix}help | develpoed by M1x3l for Steveplays`, {type:'LISTENING'})
})


client.on('message', (message) => {
    if(message.author == client.user)
    return
    if(!message.content.startsWith(settings.prefix))
    return
    
    var args = message.content.split(' ')
    args.shift()
    const command = message.content.split(' ')[0].replace(settings.prefix, '').toLowerCase()
    
    const c = this.commands.find(com => com.name.toLowerCase() == command.toLowerCase() || com.alias.includes(command.toLowerCase()))

    if(c)
        c.run(message, args, client).catch(err=> {
            console.log(err)
            message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("\:x: Error \:x:")
                .setDescription(err))
        })
})
