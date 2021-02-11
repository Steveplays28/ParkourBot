const { group } = require("console")
const { prefix, managing_color } = require("../config"),
    Discord = require("discord.js")

module.exports = {
    run: async (message, args, client) => {
        const LFGRole = message.guild.roles.cache.find(role => role.name == "LFG")
        message.member.roles.remove(LFGRole)
        message.delete()
        message.channel.send("You have stopped looking for a group.")
    },
    name: "StopLookingForGroup",
    alias: ["stoplfg"],
    desc: "Marks the author as not LFG.",
    usage: `\`\`${prefix}stoplfg\`\``
}