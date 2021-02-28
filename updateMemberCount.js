const Discord = require('discord.js')

module.exports = {
  /**
   * 
   * @param {Discord.Guild} guild
   */
  run: async (guild) => {
    try{
      guild.channels.cache.find(channel => channel.name.match(/Member Count: ?\d*/)).setName(`Member Count: ${guild.memberCount}`)
      .catch(err => {
        console.log(guild.name)
        console.log(err)
      })
    }
    catch(err) {
      if(!err.stack.includes('TypeError: Cannot read property \'setName\' of undefined'))
      console.log(err)
    }
  }
}